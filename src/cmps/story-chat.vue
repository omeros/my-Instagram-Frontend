<template>
  <div class="story-chat-container">
      <h2>Lets Chat</h2>
  
    <!-- <label>
      <input type="radio" value="Politics" v-model="topic" @change="changeTopic" /> 
      Politics
    </label>
    <label>
      <input type="radio" value="Love" v-model="topic" @change="changeTopic" /> 
      
    </label> -->
    <ul class="ul-chat">
      <li v-for="(msg, idx) in msgs" :key="idx">
        {{ msg.fullname }} : {{ msg.txt }}
      </li>
    </ul>


    <form @submit.prevent="sendMsg">
      <input class="chat-input" type="text" v-model="msg.txt" @input="userTyping()" />
      <button class="chat-btn">Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";
export default {
  name: "toy-chat",
  props: ["userId"],
  data() {
    return {
      // msg: { from: "Me", txt: "" },
      msg: { fullname: "", _id: "", txt: "" },
      msgs: [],
      topic: "Love",
      myId: null,
    };
  },
  created() {
    this.myId = this.userId;
    console.log("story in story chat ", this.myId);
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("testchat", this.addMsg);
    // socketService.on(this.userId, this.addMsg);
    //socketService.on('chat addMsg', this.addMsg)
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  mounted() {
    this.myId = this.mytoyId;
    console.log("the user in toy-chat", this.$store.getters.loggedinUser);
    socketService.on("user-typing", (isTyping) => {
      console.log("user is typing ");
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
      this.msgs.push(msg);
    },
    sendMsg() {
      this.msg.fullname = this.$store.getters.loggedinUser.fullname;
      this.msg._id = this.userId;
      console.log("the msg :", this.msg);
      // console.log('the id of myId :  :', this.myId);
      socketService.emit("chat newMsg", this.msg);
      // this.msg = {from: '', txt: ''};
    },
    changeTopic() {
      socketService.emit("chat topic", this.topic);
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