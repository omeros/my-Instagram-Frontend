<template>
  <div class="story-chat-container">
    <h2>Lets Chat...</h2>
    <div class="ul-chat">
      <div v-for="(msg, idx) in msgs" :key="idx">
        <div v-if="msg.from._id === loggedinUser._id" class="user-container">
          <img class="img-user-chat" :src="msg.from.imgUrl" />
          <span class="txt-user-chat"> {{ msg.txt }} </span>
        </div>
        <div v-else class="incoming-user-container">
          <span class="txt-incoming-user-chat"> {{ msg.txt }} </span>
          <img class="img-incoming-user-chat" :src="msg.from.imgUrl" />
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMsg">
      <div class="chat-input-container">
        <input class="chat-input" type="text" v-model="msg.txt" @input="userTyping()" />
      </div>
      <button class="chat-btn">Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";
export default {
  name: "story-chat",
  props: [ "toUser", "firstMessages"],
  data() {
    return {
      msg: { txt: "" , toId : "",from : null, newMsg : true, toUsers : null},
      msgs: [],
      topic: "Love",
      myId: null,
      loggedinUser: null,
      sendToUserId : null
    };
  },
  created() {
   
    console.log("story in story chat ", this.myId);
    socketService.setup();
   // socketService.on("msg-chat", this.addMsg);
    this.loggedinUser = this.$store.getters.loggedinUser;
   // this.myId = this.loggedinUser._id
   // this.sendToUserId = this.toUser[0]._id

    // socketService.on(this.userId, this.addMsg);
    //socketService.on('chat addMsg', this.addMsg)
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  mounted() {
    socketService.on(`${this.loggedinUser._id}`, this.addMsg);
    socketService.on("user-typing", (isTyping) => {
      console.log("user is typing ");
    });
    this.firstMessages.forEach(msg => {
      this.addMsg(msg)
    });
  },
  methods: {
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
     
    //  this.sendToUserId = msg.from._id

    },
    sendMsg() {
    
     console.log('this.msg before sending it before update ',this.msg)
       // console.log('the id of myId :  :', this.myId);
       //socketService.emit("chat newMsg", this.msg);
    //  this.msg.toId = this.sendToUserId;

    if(!this.msg.from) {                           // if the user choosed some users list for sending message
      this.msg.toUsers = this.toUser             
      console.log('yes')
    }else  if(this.msg.from._id !==this.loggedinUser._id){       
        console.log('no')           
      //  console.log('this.msg.toUsers  befor:',this.msg.toUsers )                                                // if its a user who got an a massage
             const userChoosed = this.msg.toUsers.filter((usertoFind)=>{     //  updating the "toUsers" with the sender user, and take out the current user from the list
                return (usertoFind._id === this.loggedinUser._id)
              })
            const indexOfUser =  this.msg.toUsers.indexOf(userChoosed[0])
            this.msg.toUsers.splice(indexOfUser,1)
            this.msg.toUsers.push(this.msg.from)
                 //   console.log('this.msg.toUsers after :',this.msg.toUsers )  
                  //  console.log('this.msg.from after :',this.msg.from )  
      } 
    
      this.msg.from = this.loggedinUser
      console.log('this.msg before sending it after update ',this.msg)
      socketService.emit("dual-chat", this.msg);
      const newMsg =  JSON.parse(JSON.stringify(this.msg))
      this.msgs.push(newMsg);
      this.msg.txt = ""
      this.$emit('clearChat')

      // this.msg = {from: '', txt: ''};
    },
  },
  computed: {
    // myFunction(){
    // },
  },
};
</script>

<style>
</style>