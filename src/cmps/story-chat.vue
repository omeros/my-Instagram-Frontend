<template>
  <div class="story-chat-container">
    <h2>Lets Chat...</h2>
    <div class="ul-chat">
      <div v-for="(msg, idx) in msgs" :key="idx">
        <div v-if="msg.from._id === loggedinUser._id" class="user-container">
          <img class="img-user-chat" :src="msg.from.imgUrl"  alt="image"/>
          <span class="txt-user-chat"> {{ msg.txt }} </span>
        </div>
        <div v-else class="incoming-user-container">
          <span class="txt-incoming-user-chat"> {{ msg.txt }} </span>
          <img class="img-incoming-user-chat" :src="msg.from.imgUrl" alt="user image"/>
        </div>
      </div>
    </div>
      <form @submit.prevent="sendMsg">
        <div class="chat-input-container">
          <input class="chat-input" type="text" v-model="msg.txt" @input="userTyping()" />
        </div>
        <div class="form-chat-btn-container">
            <button class="chat-btn">Send</button>
        </div>
      </form>
  </div>
</template>

<script>
import { userService } from "@/services/user.service";
import { socketService } from "@/services/socket.service";
export default {
  name: "story-chat",
  props: [ "toUser", "firstMessages"],
  data() {
    return {
      msg: { txt: "" ,from : null, newMsg : true, toUsers : null},
      msgs: [],
      topic: "Love",
      myId: null,
      loggedinUser: null,
      sendToUserId : null
    };
  },
  created() {
    socketService.setup();
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  mounted() {
       // console.log('this.firstMessagessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
    socketService.on(`${this.loggedinUser._id}`, this.addMsg);
    socketService.on("user-typing", (isTyping) => {
      console.log("user is typing ");
    });
      if((this.firstMessages)&&(this.firstMessages.length>0)){
          console.log('this.firstMessages',this.firstMessages)
        this.firstMessages.forEach(msg => {
        this.addMsg(msg)
      });
    }else{
      const lastMsgs = userService.getChatMessages()
      if((lastMsgs)&&(lastMsgs.length>0)){
        console.log(' const lastMsgs = user.userService.getAllUsers()',lastMsgs)
        for( let i = lastMsgs.length-1; i>=0 ;i--){
          const toThisUser = lastMsgs[i].toUsers.some((toUser)=>{
            return  (toUser._id ===this.loggedinUser._id)
          })
            if(toThisUser){
              this.msg = lastMsgs[i]
              this.msg.txt = ""
              break
            }
        }
      }
    }

 // test for messages to upload (depend on the user )
  this.checkUsers()

  },
  methods: {
    // test for messages to upload (depend on the user )
    checkUsers(){
    var savedMsgs = userService.getChatMessages()
    console.log('savedMsgs in story-chat  : ',savedMsgs)
    var relevantMessages = []
    if((savedMsgs)&&(savedMsgs.length>0)){
      savedMsgs  = JSON.parse(JSON.stringify(savedMsgs))

          for(let i = 0 ;i<savedMsgs.length;i++){   // using "for" instead "forEach" to reduce running time
            // if(this.loggedinUser._id === savedMsgs[i].from._id){
            //     this.msgs = savedMsgs
            //       console.log(' this.msgs = savedMsgs')
            //     break
            // }
              const userMsgs = []
           //   const userMsgs = savedMsgs[i].toUsers.map((user)=>{
              for( let j = 0 ; j<savedMsgs[i].toUsers.length;j++){
                    if ( (savedMsgs[i].toUsers[j]._id === this.loggedinUser._id) ){
                        console.log('message.toUsers[j]._id === this.loggedinUser._id')
                      relevantMessages =  relevantMessages.concat( savedMsgs[i] )
                    }else{
                     // return null
             //       }
                }
              }
              // if(userMsgs.lemgth>0){
              //     relevantMessages.concat(userMsgs)
              // }   
               console.log('this relevantMessages1',relevantMessages)
              if((savedMsgs[i].from._id===this.loggedinUser._id)){
             relevantMessages =  relevantMessages.concat(savedMsgs[i])
              }          
            }  
              console.log('this relevantMessages2',relevantMessages)
              this.msgs = relevantMessages;
              // if(relevantMessages.length>0){
              //   this.msgs = relevantMessages.filter((msg)=>{
              //           return (msg!==null) 
              //   })
              // }
                console.log('this msgsssssssssssssssssssssssssssssssssss',this.msgs)
        } 
    },

    myFunction() {
      console.log("user is typing");
    },
    userTyping() {
      console.log("user is typing");
      //      socketService.emit('user-typing', true)
      //  setTimeout(()=>{
      //     socketService.emit('user-typing', false)
      // })

      //  socketService.on('user-typing', isTyping => {
      //      console.log('user is typing ')
      //  })
    },
    addMsg(msg) {
      console.log('got msg in story chat, and the msg is : ',msg)
      this.msgs.push(msg);
      this.msg = JSON.parse(JSON.stringify(msg))
      this.msg.txt = ""
    },
    sendMsg() {
    console.log('this.msg before sending it before update ',this.msg)
    if( (!this.msg.from)&&(this.toUser.length>0) ){                          // if the user choosed some users list for sending message
      this.msg.toUsers = this.toUser             
      console.log('yes')
    }else if(this.msg.from){
      if(this.msg.from._id !==this.loggedinUser._id){       
        console.log('no')           
        const userChoosed = this.msg.toUsers.filter((usertoFind)=>{     //  updating the "toUsers" with the sender user, and take out the current user from the list
                return (usertoFind._id === this.loggedinUser._id)
        })
        const indexOfUser =  this.msg.toUsers.indexOf(userChoosed[0])
        this.msg.toUsers.splice(indexOfUser,1)
        this.msg.toUsers.push(this.msg.from)
      } 
    }
      this.msg.from = this.loggedinUser
      const newMsg =  JSON.parse(JSON.stringify(this.msg))
      console.log('this.msg before sending it after update ',newMsg)
      socketService.emit("multi-chat", newMsg);
      this.msgs.push(newMsg);
      const savedMsgs = userService.saveChatMessages(newMsg) 
      this.msg.txt = ""
      this.$emit('clearChat')
    },
  },
  computed: {
  },
};
</script>

<style>
</style>