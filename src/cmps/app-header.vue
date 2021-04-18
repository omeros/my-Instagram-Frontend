<template>
  <header class="">
         
    <div class="app-center inner-header2">
      <div class="nav-bar main-header-inner">
       
              <div class="logo-container ">


                    <router-link to="/" class="instagram-router-link">
                      <img  class="h1-header opacity"  v-bind:class="{pressed: instagramPressed }"  @click="instagramIsPressed()" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"  alt="profile pic" />
                    </router-link>
                  <div class="search-container">
                      <user-filter @filtered="setFilter" />
                  </div>
                  
              </div>
            <nav>
              <div class="header-links">
                  <button class="pluse-img-btn" @click.stop="openModal()">
                    <img  class="pluse-img opacity"  src="https://res.cloudinary.com/omerphoto/image/upload/v1618759085/plus6_cess9i.png"  alt="profile pic" />
                  </button>

                <router-link to="/">
                  <span class="home-logo opacity" role="img" aria-label="logo">
                    <svg height="30" viewBox="0 0 48 48" width="22">
                      <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                    </svg>
                  </span>
                </router-link>

                <span class="add-story opacity">
                  <svg height="22" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                </span>
                <a href="#/explore" class="opacity"><svg height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path></svg></a>

                <span class="add-story opacity">
                    <svg height="22" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> 
                </span>         
                <img v-if="loggedInUser.imgUrl" class="user-logo opacity" :src="loggedInUser.imgUrl"  alt="profile pic"  @click="openUserModal()"/>                     
                <img  v-else class="user-logo opacity" src="http://coding-academy.org/books-photos/11.jpg" alt="profile pic"  @click="openUserModal()"/>                     

              </div>  
            </nav>
      </div>
          <transition name="fade">
                <div class="modal-container " v-if="open">
                        <new-story-modal :emptyStory="emptyStory"  @afterPost=afterPost  :smiles="smiliesToShow" />
                </div>
          </transition>
            <transition name="fade" >
                <div class="user-modal-container " v-if="isUserModal" >
                <userModal :loggedInUser = "loggedInUser" @closeTheModal=openUserModal />
                 </div>
            </transition>
    </div>
  </header>
</template>
<script>
import { eventBus } from "@/services/event-bus.service.js";
import userFilter from "@/cmps/user-filter.vue";
import newStoryModal from "@/cmps/new-story-modal.vue";
import userModal from "@/cmps/user-modal.vue";
export default {
  name: "app-header",
    data() {
      return {
        instagramPressed : false,
         filterBy: null,
         open : false,
         emptyStory : null,
         isUserModal : false
      }
    },
  created() {
          eventBus.$on("closeAddStoryModal", () => {
            this.closeModal()
    });
      eventBus.$on('doNotCloseTheNewStoryModal',() => {
           this.stayOpen()
    });
  },



  computed: {
    smiliesToShow(){
       const smiley = this.$store.getters.smiley
       return smiley
   },
    loggedInUser() {
  //    console.log(" loggedinUser in app-head", this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
     methods: {
       afterPost(){
           this.open=false
       },
          stayOpen(){
       this.open = true
      },
       openUserModal(){
            this.isUserModal = !this.isUserModal
       },
       closeModal(){
         this.open = false;
       },
       openModal(){
         this.emptyStory =  this.$store.getters.getEmptyStory
         console.log('emptyStory at app header',this.emptyStory)
         this.open= !this.open
       },
       instagramIsPressed(){
          this.instagramPressed = !this.instagramPressed;     
                    setTimeout(()=>{
                    this.instagramPressed = !this.instagramPressed; 
      }, 1000);  
      },
       setFilter(filterBy) {
            console.log("set filter is running", filterBy);
            this.$store.commit({ type: "filterByChanged", strFilter: filterBy });
      },

          goHome() {
        console.log("instanbul pressed");
        //  this.$router.push('/')
      },
    },
  
  components: {
    userFilter,
    newStoryModal,
    userModal
    
  },
};
</script>