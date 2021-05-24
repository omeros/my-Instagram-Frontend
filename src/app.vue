<template>
    <div class="app">
      <div id="nav" @click.stop="closeModal()">
      <transition name="fade">
          <div class="absolute-pos" v-if="isChat" >
            <div  class="fixed-pos"  >
              <storyChat   :toUser="usersToChatWith" :firstMessages="messages" @clearChat="clearChat1" />
            </div>
        </div>
     </transition>
     <div class="users-for-chat-container" v-if="!isChat">
        <div v-for="user in allLoggedinUsers" :key="user._id" class="users-for-chat">
            <img class="users-img-for-chat" :src="user.imgUrl"  @click.stop="chooseUser(user)"  v-bind:class="{ gotmsg: user.gotMsg , sendTo: user.sendTo }"/>
            {{user.username}}
        </div>
     </div>
      <div class="btn-absolute-pos" >
        <div  class="btn-absolute-pos">
          <button  class="open-chat" @click.stop="openChat()" v-if="!isChat"> Open Chat </button>
          <button  class="open-chat" @click.stop="openChat()" v-if="isChat"> Close Chat </button>
        </div>
        
      </div>
      <app-header />
      <router-view />
      <app-footer />
    </div>
  </div>
</template>



<script>
import { socketService } from "@/services/socket.service";
import storyChat from "@/cmps/story-chat.vue";
import { eventBus } from "@/services/event-bus.service.js";
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
import {userService} from "@/services/user.service";
// import { eventBus } from "./services/event-bus.service.js"

export default {
  name: "App",

  data() {
    return {
      loggedinUser: null,
      isChat : false,
      allLoggedinUsers : [],
      usersToChatWith : [],
      isMsg : false,
      idFrom : null,
      messages : []
    };
  },

  async created() {
    console.log("Vue App was created!!!");
    await this.$store.dispatch({ type: "loadStories" });
    await this.$store.dispatch({ type: "loadUsers" });
    this.loggedinUser = this.$store.getters.loggedinUser;
    if(!this.loggedinUser){
        const userToLogin = this.$store.getters.users
        console.log('userToLoginin story app',userToLogin)
        const loginCred  =  {username: 'Charles.g', password: '1234'}
        console.log('Charles.g')
        console.log(' userToLogin[3].username', userToLogin[3].username)
        loginCred.username = userToLogin[4].username ;
        await this.$store.dispatch({ type: "login", userCred: loginCred });
        this.loggedinUser = this.$store.getters.loggedinUser;
        socketService.emit("user-connected-details", this.loggedinUser); 
        socketService.on("all-users-connected-details", this.addUserDetails);
        }else{
     socketService.emit("user-connected-details", this.loggedinUser); 
     socketService.on("all-users-connected-details", this.addUserDetails);
    }
    
    this.allLoggedinUsers = userService.getLoggedinUsers()
   // socketService.on("msg-chat", this.gotMsg);
    socketService.on(`${this.loggedinUser._id}`, this.gotMsg);
  },

mounted(){
   const users = this.$store.getters.loggedinUsers
   console.log('the users from user stor ',users)

    // const usersConcat =   users.concat(this.allLoggedinUsers)
    // const allUsers = usersConcat.filter((vale,index) => usersConcat.indexof(value) === index )  // remove duplicate values
    // this.allLoggedinUsers = allUsers
},
  computed: {
    test(){
            let userChoosed = false
            userChoosed = this.allLoggedinUsers.some((user)=>{
            return (user._id === this.idFrom)
      })
        return userChoosed

    },
    isMsgComputed(){
       return this.isMsg
    },
       myId(){
        return  this.loggedinUser._id
    },
     myId(){
       return  this.loggedinUser._id
     }
  },
  methods: {
    gotMsg(msg){
      console.log('got msg on app',msg)
      //this.isMsg = true
      const userChoosed = this.allLoggedinUsers.filter((user)=>{
        return (user._id === msg.from._id)
      })
      console.log(' user choooooosed : ',userChoosed )
      // userChoosed[0].newMsg = true
      // user.newMsg = true
      this.idFrom = userChoosed[0]._id
      userChoosed[0].gotMsg = true
      userChoosed[0].sendTo = false
      if(!this.isChat){
        this.messages.push(msg)
      }
    //  const messages =  userService.saveChatMessages(msg)
    },
    clearChat1(id){
     // console.log('message  from :',id)
      this.usersToChatWith = null
      // this.isMsg = true
    },
    chooseUser(user){
      const isContainUser = this.usersToChatWith.some((userToFind)=>{
          return (user._id === userToFind._id)
      })
      if(!isContainUser){
        this.usersToChatWith.push(user);
      }else{
              const indexOfUser =  this.usersToChatWith.indexOf(user)
              this.usersToChatWith.splice(indexOfUser,1)
      }
      this.isMsg = false
      this.idFrom = null 
      const userChoosed = this.allLoggedinUsers.filter((usertoFind)=>{
        return (usertoFind._id === user._id)
      })
      if(userChoosed[0].sendTo){
          userChoosed[0].sendTo = false 
      }else{
          userChoosed[0].sendTo = true
      }
      this.$forceUpdate();
      
     //this.openChat() 

     console.log('this.usersToChatWith : ',this.usersToChatWith)
    },
      addUserDetails(user){
        user.gotMsg = false
        const users = userService.saveLocalUsers(user)
        this.allLoggedinUsers = users
      },
    openChat(){
          this.isChat = !this.isChat
          this.allLoggedinUsers.forEach(element => {
          element.sendTo = false
        });

       this.allLoggedinUsers.forEach(user=>{
          user.gotMsg = false
          user.sendTo = false 
   })
   
        // this.allLoggedinUsers.gotMsg = false
        // this.allLoggedinUsers.sendTo = false

     
      },
    closeModal() {
      eventBus.$emit("closeAddStoryModal");
      eventBus.$emit("closeDetailsModal");
      //  eventBus.$emit('closeModal')
    },
  },

  components: {
    appHeader,
    appFooter,
    storyChat,
    },
};
</script>


<style>
</style>
