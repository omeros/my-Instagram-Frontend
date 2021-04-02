<template>
  <section class="main-details app-center "  v-if="user"  @click.stop="closeModal()" >



    <div class="profile"  >
      <div class="img-container">
        <img :src="user.imgUrl" class="details-img" />
      </div>

      <div class="details-container">

          <div class="profile-description-top">
            <h2 class="profile-description-top-username"> {{ user.username }} </h2>
          </div>

      <div class="followers-num">

          <span class="profile-count">
            <span class="profile-count-num"> {{ numPosts }}</span>
            posts
          </span>

          <span class="profile-count-others">
            <span  class="profile-count-num"> {{ followersNum }}</span>
        followers
          </span>

          <span class="profile-count-others">
            <span  class="profile-count-num"> {{ followingNum }}</span>
        following
          </span>
      
      </div>

        <div class="profile-description-bio">
          <h3>{{ user.fullname }}</h3>
          <p>{{ user.bio }}</p>
        </div>

        <!-- <div>
          <p>{{ user.reateAt }}</p>
        </div> -->

      </div>


     </div>

     
       <div class="profile-posts"   >
            <div class="profile-posts-item"   v-for="story in stories" :key="story._id">
            <img :src="story.imgUrl" class="details-stories-img"  @click.stop="openModal(story._id)"/>
        </div>
    </div>
        <div class="details-story-modal hide" v-bind:class="{show: isModal }">
          <div  class=" modal-content ">
              <div class="story-modal-img-container">
                <img v-if="isModal" :src="storyToShow.imgUrl" class="img-modal"/>
              </div>
              <div class="post-modal"> 
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. eeeeeeeeeeeeeeeeeeeeeeeee
              </div>
          </div>
         </div>




  </section>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
export default {
  name: "user-details",
  data() {
    return {
      userId: null,
      user: null,
      stories: null,
      isModal : false,
      storyToShow : null
    };
  },
  async created() {

  },
   watch: {

  },
   created() {
   
   },
  mounted() {
    this.userId = this.$route.params.id;
    this.user = this.$store.getters.getUserById(this.userId);
    const storiesToShow = this.$store.getters.getStoryByUserId(this.userId);
    console.log("stories on user-details", storiesToShow);
    this.stories = storiesToShow;
  },
    methods: {
      openModal(storyId){
          var storyToShow = this.stories.filter(story=>{
              if(story._id===storyId){
              return story
            }
          })
          console.log('open modal in user-details')
        // eventBus.$emit('xxx')


          // this.isModal = !this.isModal
          // console.log('the story to sow : ',storyToShow[0])
          // console.log('isModal : ',  this.isModal)
          // this.storyToShow=storyToShow[0]
   
    },
      closeModal(){
     // this.isModal = !this.isModal
           console.log('close modal in user details  ')
      },
    
    },
  computed: {
    followersNum() {
      return this.user.followers.length;
    },
    followingNum() {
      return this.user.following.length;
    },
    numPosts() {
      return 0;
    },

    // userLogIn() {
    //   return this.$store.getters.watchedUser;
    // },
    // userId() {
    //   return this.$route.params.id;
    // },
  },
};
</script>