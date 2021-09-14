<template>
  <header class="">        
    <div class="inner-header2">
      <div class="nav-bar main-header-inner">
              <div class="logo-container ">
                    <router-link to="/" class="instagram-router-link" title="home page">
                      <img  class="h1-header opacity"  v-bind:class="{pressed: instagramPressed }"  @click="instagramIsPressed()" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"  alt="profile pic" />
                    </router-link>
                  <div class="search-container" title="search post by user" >
                      <user-filter @filtered="setFilter" />
                  </div>
              </div>
            <nav>
                <router-link to="/"  >
                  <span class="home-logo opacity" role="img" aria-label="logo" title="home page">
                    <svg height="30" viewBox="0 0 48 48" width="22">
                      <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                    </svg>
                  </span>
                </router-link>
                  <button class="pluse-img-btn" @click.stop="openModal()" title="add user" >
                    <img  class="pluse-img opacity"  src="https://res.cloudinary.com/omerphoto/image/upload/v1618759085/plus6_cess9i.png"  alt="profile pic" />
                  </button>
                <!-- <span class="hart opacity">
                  <svg viewBox="0 0 28 28" alt="" class="a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry" height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>
                </span>          -->
                <img v-if="loggedInUser" class="user-logo opacity" :src="loggedInUser.imgUrl" title=" user prifile" alt="profile pic"  @click="openUserModal()"    />                     
                <img  v-else class="user-logo-logout opacity" src="http://coding-academy.org/books-photos/11.jpg" alt="profile pic"  @click="openUserModal()"/>                     
                <router-link to="/about"  class="about"  title="about page">
                    <img src="https://res.cloudinary.com/omerphoto/image/upload/v1627409148/about2_p7rzmx.png" alt="">
                </router-link>
            </nav>
      </div>
          <transition name="fade">
                <div class="modal-container " v-if="open" >
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
       // console.log('emptyStory at app header',this.emptyStory)
        this.open= !this.open
      },
      instagramIsPressed(){
          this.instagramPressed = !this.instagramPressed;     
                    setTimeout(()=>{
                    this.instagramPressed = !this.instagramPressed; 
      }, 1000);  
      },
      setFilter(filterBy) {
     //       console.log("set filter is running", filterBy);
            this.$store.commit({ type: "filterByChanged", strFilter: filterBy });
      },
      goHome() {
  //      console.log("instanbul pressed");
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