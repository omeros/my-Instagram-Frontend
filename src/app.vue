<template>
    <div class="app">
      <div id="nav" @click.self="closeModal()">
      <transition name="fade">
          <div class="absolute-pos" v-if="isChat" >
            <div  class="fixed-pos"  >
              <storyChat   :toUser="usersToChatWith" :firstMessages="messages" @clearChat="clearChat1" />
            </div>
        </div>
    </transition>
    <div class="users-for-chat-container" v-if="!isChat">
        <div v-for="user in allLoggedinUsers" :key="user._id" class="users-for-chat"  >
            <img class="users-img-for-chat" :src="user.imgUrl"   title="choos user to chat with..." @click.stop="chooseUser(user)"  v-bind:class="{ gotmsg: user.gotMsg , sendTo: user.sendTo }" alt="image" />
            <span class="users-txt-for-chat-name" >  {{user.username}} </span>
        </div>
    </div>
      <div class="btn-absolute-pos" >
        <div  class="btn-absolute-pos">                                                         
          <button  class="open-chat"  title="open chat" @click.stop="openChat()" v-if="!isChat" > <img src="https://res.cloudinary.com/omerphoto/image/upload/v1645829347/Instagram/facebook2_crnrxx.png" alt="">
            </button>
          <button  class="open-chat" title="close chat" @click.stop="openChat()" v-if="isChat" > <svg width="26px" height="26px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"  ></line></svg> </button>
        </div>
      </div>
      <app-header  />
      <router-view />
      <app-footer />
    </div>
  </div>
</template>

            // <em data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/kqWz_rDzdJb.png&quot;); background-position: 0px -960px; background-size: 26px 1890px; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></em>


<script>
import { socketService } from "@/services/socket.service";
import storyChat from "@/cmps/story-chat.vue";
import { eventBus } from "@/services/event-bus.service.js";
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
import {userService} from "@/services/user.service";

export default {
  name: "App",

  data() {
    return {
      loggedinUser: null,
      isChat : false,
      allLoggedinUsers : [],
      usersToChatWith : [],
      isMsg : false,
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
        const loginCred  =  {username: 'Charles.g', password: '1234'}
        loginCred.username = userToLogin[4].username ;
        await this.$store.dispatch({ type: "login", userCred: loginCred });
        this.loggedinUser = this.$store.getters.loggedinUser;
        socketService.emit("user-connected-details", this.loggedinUser); 
        socketService.on("user-now-connected", this.addUserDetails);  // after user connected
    }else{
        socketService.emit("user-connected-details", this.loggedinUser); 
        socketService.on("user-now-connected", this.addUserDetails);
    }
    socketService.on("usersConnections", this.usersConnections);  // after user connected
    // this.allLoggedinUsers = userService.getLoggedinUsers()
    socketService.on("updateLoginUser", this.updateLoginUser);   // after user connected
    socketService.on("user-has-disconnect", this.usersConnections);
  },
    destroyed() {
    socketService.off(`${this.loggedinUser._id}`, this.addMsg);
  },

  mounted(){
    console.log("app.vue was mounted!!!");
    //this.setColorsForChatImg()
},
  computed: {
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
    // set the color for showing sentTo and gotMessage color logo
    setColorsForChatImg(){
      const users = userService.getAllUsers()
      if(users&&users.length>0){
          users.forEach((user)=>{
            if( (user.sendTo)){
              console.log('user.sendTo != undefined')
                console.log(' this.allLoggedinUsers',this.allLoggedinUsers)
                const idx = this.allLoggedinUsers.findIndex((user2)=>{  
                      if (user._id===user2._id){return true}
                })
                console.log(' idx',idx)
                this.allLoggedinUsers[idx].sendTo = true
                console.log(' this.allLoggedinUsers[idx].sendTo', this.allLoggedinUsers[idx].sendTo)
            }else if(user.gotMsg){
              console.log('user.gotMsg')
              const idx2 = this.allLoggedinUsers.findIndex((user2)=>{  
                      if (user._id===user2._id){return true}
                })
                this.allLoggedinUsers[idx2].gotMsg = true
            }
          })
      }
    },
      updateLoginUser(loggedinUser){
    //  console.log(' loggedinUser on updateLoginUser on app.vue', loggedinUser)
      socketService.off(`${this.loggedinUser._id}`, this.addMsg);
      this.loggedinUser = loggedinUser
      socketService.on(`${loggedinUser._id}`, this.addMsg);
    },

      //********************* all the users who are connected to the app - comming from Server ************************** */
      usersConnections(usersConnections){
      this.loggedinUser = this.$store.getters.loggedinUser;
      const isContainUser =  usersConnections.some((userToFind)=>{
        return (this.loggedinUser._id === userToFind._id)
      })
      if(isContainUser){
        const userToRemove = usersConnections.filter((user)=>{
          return (this.loggedinUser._id === user._id)
      })
  //    console.log('userToRemove on app',userToRemove)
        const indexToRemove =  usersConnections.indexOf(userToRemove[0])
        usersConnections.splice(indexToRemove,1)
        this.allLoggedinUsers = JSON.parse(JSON.stringify(usersConnections))
      }
      // get users from sessionStorage for showing sentTo and gotMessage color logo
      this.setColorsForChatImg()

    },
  //************* got message from another user *****************//
    addMsg(msg){
      const userChoosed = this.allLoggedinUsers.filter((user)=>{
        return (user._id === msg.from._id)
      })
      userChoosed[0].gotMsg = true
      userChoosed[0].sendTo = false
    //        console.log('userChoosed on app',userChoosed)
      if(!this.isChat){
        this.messages.push(msg)
      }
      userService.saveAllUsers(this.allLoggedinUsers)
      this.$forceUpdate();
    },
    clearChat1(id){
      this.usersToChatWith = []
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
      const userChoosed = this.allLoggedinUsers.filter((usertoFind)=>{
        return (usertoFind._id === user._id)
      })
      if(userChoosed[0].sendTo){
          userChoosed[0].sendTo = false 
      }else{
          userChoosed[0].sendTo = true
      }   
      userService.saveAllUsers(this.allLoggedinUsers)
      this.$forceUpdate();
      },
      // ********** a single user has just connected, and he sent his details to the other users **************//
      addUserDetails(user){
        user.gotMsg = false
        this.loggedinUser = this.$store.getters.loggedinUser;
        if(user._id!==this.loggedinUser._id){
        //    console.log('yes', user)
            const isContainUser = this.allLoggedinUsers.some((userToFind)=>{
            return (user._id === userToFind._id)
          })
        if(!isContainUser){
            this.allLoggedinUsers.push( (JSON.parse(JSON.stringify(user))))
          }
        }
      },
    openChat(){
        this.isChat = !this.isChat
        if(this.allLoggedinUsers){
        this.allLoggedinUsers.forEach(user=>{
            user.gotMsg = false
            user.sendTo = false 
        })
        userService.saveAllUsers(this.allLoggedinUsers)
      }
    },
    closeModal() {
      eventBus.$emit("closeAddStoryModal");
      eventBus.$emit("closeDetailsModal");
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
