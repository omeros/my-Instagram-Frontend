<template>
  <section
    class="main-details app-center"
    v-if="user"
    @click.stop="closeModal()"
  >
    <div class="profile">
      <div class="img-container">
        <img :src="user.imgUrl" class="details-img" />
      </div>

      <div class="details-container">
        <div class="profile-description-top">
          <h2 class="profile-description-top-username">{{ user.username }}</h2>
        </div>

        <div class="followers-num">
          <span class="profile-count">
            <span class="profile-count-num"> {{ numPosts }}</span>
            posts
          </span>

          <span class="profile-count-others">
            <span class="profile-count-num"> {{ followersNum }}</span>
            followers
          </span>

          <span class="profile-count-others">
            <span class="profile-count-num"> {{ followingNum }}</span>
            following
          </span>
        </div>

        <div class="profile-description-bio">
          <h3>{{ user.fullname }}</h3>
          <p>{{ user.bio }}</p>
        </div>
      </div>
    </div>

    <div class="profile-posts"  v-if="stories">
      <div class="profile-posts-item" v-for="story in stories" :key="story._id"  >
        <img :src="story.imgUrl"  class="details-stories-img" @click.stop="openModal(story._id)" />
      </div>
    </div>
    <div class="details-story-modal" v-if="isModal">
      <storyPreviewModalContainer :story="storyToShowFromComputed" :smiles="smiliesToShow" @removepost=removepost />
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
import { storyService } from "../services/story.service.js";
import storyPreviewModal from "@/cmps/story-preview-modal.vue";
import storyPreviewModalContainer from "@/cmps/story-preview-modal-container";
export default {
  name: "user-details",
  data() {
    return {
      userId: null,
      user: null,
      stories: null,
      isModal: false,
      storyToShow: null,
      txt : '',
      isLiked : false,
    };
  },
  async created() {
  },
  watch: {},
  created() {
      this.userId = this.$route.params.id;
      this.user = this.$store.getters.getUserById(this.userId);
      this.stories =  this.$store.getters.getStoryByUserId(this.userId);
      console.log('stories on user details created ',  this.stories)
      eventBus.$on("closeDetailsModal", () => {
      this.closeModal();
    });
      eventBus.$on("doNotCloseTheModal", () => {
      this.stayOpen();
    });
    //  eventBus.$on('mmmmm',this.ttt())
        eventBus.$on('openModalFromCommentInput', (commentStory) => {
        this.addComment(commentStory)
    })
    eventBus.$on('openModalFromActionBar', (id) => {
        console.log(' openModalFromActionBar on listener on user details')
            this.addLike(id)
    })
    eventBus.$on('mytest', (id) => {
            this.justOpenTheModal(id)
   })
  },
  mounted() {
    // this.userId = this.$route.params.id;
    // this.user = this.$store.getters.getUserById(this.userId);
    // const storiesToShow = this.$store.getters.getStoryByUserId(this.userId);
    // console.log("stories on user-details", storiesToShow);
   // this.stories = storiesToShow;

  
  },
   destroyed(){
    eventBus.$off('openModalFromCommentInput', (commentStory) => {
        this.addComment(commentStory)
    })
    eventBus.$off('openModalFromActionBar', (id) => {
            this.addLike(id)
    })
    eventBus.$off('mytest', (id) => {
            this.justOpenTheModal(id)
   })
        eventBus.$off("closeDetailsModal", () => {
      this.closeModal();
    });
      eventBus.$off("doNotCloseTheModal", () => {
      this.stayOpen();
    });
   },
  methods: {
        addLike(id){
            console.log('add like in user details')
            this.isLiked ?   this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id }) :  this.$store.dispatch({ type: 'setLikeToStory', storyId: id })  
            this.isLiked  = !this.isLiked 
          //    this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id })  <=================  to change back
          //  this.$store.dispatch({ type: 'setLikeToStory', storyId: id })
            //var x = this.isLikedComputed// = !this.isLiked
           // this.storyToShow = this.$store.getters.getStoryByUserId(this.userId);
            console.log('add like in user details,   this.storyToShow',this.storyToShow)
          //  this.isModal=false
           // this.openModal(id)


    },
      addCommentToStory(commentStory){
        // if(this.storyToShow._id===commentStory.storyId){
        //     console.log('user detailsssssssssssssssssssssssssssssssssss')
        //     this.txt=commentStory.txt
        //     this.addComment(commentStory.storyId)
        // }
    },
      addComment(commentStory){
        console.log('comment in user details',commentStory)
        // var commentStory ={
        //   txt : this.txt,
        //   storyId : id,
        // } 
        this.$store.dispatch({ type: 'addCommentToStory', comment: commentStory })
        //this.txt = null;
        // this.closeSmily()
        this.stories  = this.$store.getters.getStoryByUserId(this.userId);
       // this.openModal(commentStory.storyId)
    },

    removepost(){
  //      console.log('remove post on user-datails')
        this.$store.dispatch({ type: 'removeStory', storyToRemoveId: this.storyToShow._id })
        this.isModal = false;

    },
    stayOpen() {
      this.isModal = true;
    },
    openModal(storyId) {
      var storyToShow = this.stories.filter((story) => {
        if (story._id === storyId) {
          return story;
        }
      });
    //  console.log("open modal in user-details");
    //  console.log("the story to show : ", storyToShow[0]);
    //  console.log("isModal : ", this.isModal);
      this.storyToShow = storyToShow[0];
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
   //  console.log("close modal in user details  ");
      eventBus.$emit("closeAddStoryModal");
    },
  },
  computed: {
      smiliesToShow (){
        return this.$store.getters.smiley
    },
    isLikedComputed(){
            this.isLiked = !this.isLiked
    },
    storyToShowFromComputed(){
    // console.log(" conputed in user details:  this.stories.likedBy.length ",this.stories.likedBy.length);
     console.log(" conputed in user details:  this.storyToShow.likedBy.length ",this.storyToShow.likedBy.length);
        return this.storyToShow
    },
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
  components: {
    storyPreviewModal,
    storyPreviewModalContainer,
  },
};
</script>