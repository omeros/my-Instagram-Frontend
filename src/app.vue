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
          <button  class="open-chat" @click.stop="openChat()" v-if="!isChat"><i data-visualcompletion="css-img" class="hu5pjgll lzf7d6o1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/pZnj7-h1xop.png&quot;); background-position: 0px -504px; background-size: 26px 1636px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i> </button>
          <button  class="open-chat" @click.stop="openChat()" v-if="isChat"> <svg width="26px" height="26px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg> </button>
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
    console.log("app.vue was created!!!");
    await this.$store.dispatch({ type: "loadStories" });
    await this.$store.dispatch({ type: "loadUsers" });
    this.loggedinUser = this.$store.getters.loggedinUser;
    if(!this.loggedinUser){
        const userToLogin = this.$store.getters.users
    //    console.log('userToLoginin story app',userToLogin)
        const loginCred  =  {username: 'Charles.g', password: '1234'}
        loginCred.username = userToLogin[4].username ;
        await this.$store.dispatch({ type: "login", userCred: loginCred });
        this.loggedinUser = this.$store.getters.loggedinUser;
        socketService.emit("user-connected-details", this.loggedinUser); 
        socketService.on("all-users-connected-details", this.addUserDetails);
        }else{
        socketService.emit("user-connected-details", this.loggedinUser); 
        socketService.on("all-users-connected-details", this.addUserDetails);
    
    }
    
    socketService.on("usersConnections", this.usersConnections);
    this.allLoggedinUsers = userService.getLoggedinUsers()
   // socketService.on("msg-chat", this.gotMsg);
    console.log("this.loggedinUser  in app.vue ", this.loggedinUser);
  //  socketService.on(`${this.loggedinUser._id}`, this.gotMsg);
    socketService.on("updateLoginUser", this.updateLoginUser);
    socketService.on("user-has-disconnect", this.userDisconnect);
 
  },

  mounted(){
    console.log("app.vue was mounted!!!");

  //const users = this.$store.getters.loggedinUsers
  //this.loggedinUser = this.$store.getters.loggedinUser;
  //console.log("this.loggedinUser  in story chat ", this.loggedinUser);
 // socketService.on(`${this.loggedinUser._id}`, this.gotMsg);
 // console.log('the users from user stor ',users)

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
    userDisconnect(user){
     let isContainUser =   this.allLoggedinUsers.some((userToFind)=>{
                return (user._id === userToFind._id)
            })
        if(isContainUser){
                let userToRemove = this.allLoggedinUsers.filter((userToFind)=>{
                    return (user._id === userToFind._id)
                })
        let indexToRemove =  this.allLoggedinUsers.indexOf(userToRemove[0])
                this.allLoggedinUsers.splice(indexToRemove,1)
      }

    },
      updateLoginUser(loggedinUser){
      console.log(' loggedinUser on updateLoginUser on app.vue', loggedinUser)
        //    this.$forceUpdate();
      this.loggedinUser = loggedinUser
      socketService.on(`${this.loggedinUser._id}`, this.gotMsg);
      //  console.log(' updateLoginUser this.loggedinUser', this.loggedinUser)
    },

      //********************* all the users who are connected to the app - comming from Server ************************** */
      usersConnections(usersConnections){
      this.loggedinUser = this.$store.getters.loggedinUser;
      console.log('usersConnections on App on usersConnections',usersConnections)
      console.log('this.loggedinUser on App.vue on usersConnections ',this.loggedinUser)

      const isContainUser =  usersConnections.some((userToFind)=>{
        return (this.loggedinUser._id === userToFind._id)
      })

      if(isContainUser){
        const userToRemove = usersConnections.filter((user)=>{
          return (this.loggedinUser._id === user._id)
      })
      console.log('userToRemove on app',userToRemove)
        const indexToRemove =  usersConnections.indexOf(userToRemove[0])
        usersConnections.splice(indexToRemove,1)
        this.allLoggedinUsers = JSON.parse(JSON.stringify(usersConnections))
      }
       console.log('this.allLoggedinUsers',this.allLoggedinUsers)
    },
    gotMsg(msg){
      console.log('got msg on app',msg)
      //this.isMsg = true
       console.log('this.allLoggedinUsers on app',this.allLoggedinUsers)
      const userChoosed = this.allLoggedinUsers.filter((user)=>{
        return (user._id === msg.from._id)
      })
    //  console.log(' user choooooosed : ',userChoosed )
      // userChoosed[0].newMsg = true
      // user.newMsg = true
      this.idFrom = userChoosed[0]._id
      userChoosed[0].gotMsg = true
      userChoosed[0].sendTo = false
            console.log('userChoosed on app',userChoosed)
      if(!this.isChat){
        this.messages.push(msg)
      }
    //  const messages =  userService.saveChatMessages(msg)
      this.$forceUpdate();
    },
    clearChat1(id){
     // console.log('message  from :',id)
      this.usersToChatWith = []
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

  //  console.log('this.usersToChatWith : ',this.usersToChatWith)
    },
      // a single user have just connected, and he sent his details to the other users
      addUserDetails(user){
        console.log('user from websockets on app : ',user)
        // console.log('user this.loggedinUser on app :',this.loggedinUser)
       // console.log('addUserDetails  this.loggedinUser on app',this.loggedinUser)
        user.gotMsg = false
        this.loggedinUser = this.$store.getters.loggedinUser;
        if(user._id!==this.loggedinUser._id){
          console.log('yes')
        //  const users = userService.saveLocalUsers(user) //
          this.allLoggedinUsers.push( (JSON.parse(JSON.stringify(user))))
        }
      },
    openChat(){
        this.isChat = !this.isChat
        if(this.allLoggedinUsers){
        this.allLoggedinUsers.forEach(user=>{
            user.gotMsg = false
            user.sendTo = false 
        })
      }


     
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
