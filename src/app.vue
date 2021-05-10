<template>
    <div id="app">
      <div id="nav" @click.stop="closeModal()">
      <transition name="fade">
        <div class="absolute-pos" v-if="isChat" >
            <div  class="fixed-pos"  >
              <storyChat :userId="myId" />
            </div>
        </div>
     </transition>
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
import storyChat from "@/cmps/story-chat.vue";
import { eventBus } from "@/services/event-bus.service.js";
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
// import { eventBus } from "./services/event-bus.service.js"

export default {
  name: "App",

  data() {
    return {
      loggedinUser: null,
      isChat : false,
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
        loginCred.username = userToLogin[2].username ;
        await this.$store.dispatch({ type: "login", userCred: loginCred });
        this.loggedinUser = this.$store.getters.loggedinUser;
    }



  },

  computed: {
       myId(){
        return  this.loggedinUser._id
    },
     myId(){
       return  this.loggedinUser._id
     }
  },
  methods: {
    openChat(){
          this.isChat = !this.isChat
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


<style lang="scss">
</style>
