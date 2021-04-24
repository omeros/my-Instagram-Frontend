<template>
  <div id="app">
    <div id="nav" @click.stop="closeModal()">
      <app-header />
      <router-view />
      <app-footer />
    </div>
  </div>
</template>



<script>
import { eventBus } from "@/services/event-bus.service.js";
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
// import { eventBus } from "./services/event-bus.service.js"

export default {
  name: "App",

  data() {
    return {
      loggedinUser: null,
    };
  },

  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadStories" });
    this.$store.dispatch({ type: "loadUsers" });
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  computed: {
     myId(){
       return  this.loggedinUser._id
     }
  },
  methods: {
    closeModal() {
      eventBus.$emit("closeAddStoryModal");
      eventBus.$emit("closeDetailsModal");
      //  eventBus.$emit('closeModal')
    },
  },

  components: {
    appHeader,
    appFooter,
    },
};
</script>


<style lang="scss">
</style>
