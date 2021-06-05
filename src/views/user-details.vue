<template>
  <section class="main-details " v-if="user" @click.stop="closeModal()" >
    <div class="profile">
      <div class="img-container">
        <img  v-if="user.imgUrl&&isEdit" :src="user.imgUrl" class="details-img" />
        <img-upload @imgSaved="imgUserChoosed" v-if="!user.imgUrl|| !isEdit " />
      </div>



      <div class="details-container">
        <div class="profile-description-top">
          <h2 class="profile-description-top-username">{{ user.username }}</h2>
        </div>

        <div class="followers-num">
          <span class="profile-count">
            <span class="profile-count-num" v-if="stories"> {{ numPosts }}</span>
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
          <template v-if="isEdit">
            <h3 class="h3-mobile">{{ user.fullname }}</h3>
            <p class="p-mobile" >{{ user.bio }}</p>
          </template>
          <div  v-else class="user-details-fill" >
            <span class="user-fullname-fill-container"><input type="text" class="user-fullname-fill" placeholder="full name" v-model = "user.fullname"> </span>
            <span class="user-bio-fill-container" > <textarea name="" id=""  class="user-bio-fill" cols="30" rows="10" placeholder="your bio" v-model = " user.bio"></textarea></span>
          </div>
        </div>
      </div>
      <div class="edit-user-details-btn">
        <button  @click.stop="editUserDetails()" >
          <svg aria-label="Options" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fill-rule="evenodd"></path></svg>
        </button>
        <button class="save-user-details opacity"  @click.stop="saveUserDetails()" v-if="isSaved"> Save</button>
      </div>
    </div>
    <span class="profile-tabs-tab"><svg height="12" viewBox="0 0 48 48" class="svg-test" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg> Posts </span>
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
import imgUpload from "@/cmps/img-upload";
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
      isEdit : true,
      isSaved : false
    };
  },
  async created() {
  },
  watch: {},
  created() {
      this.userId = this.$route.params.id;
      const objUser = this.$store.getters.getUserById(this.userId);
      this.user = JSON.parse(JSON.stringify(objUser))
      this.stories =  this.$store.getters.getStoryByUserId(this.userId);
    //  console.log('stories on user details created ',  this.stories)
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
    // eventBus.$on('openModalFromActionBar', (id) => {
    //     console.log(' openModalFromActionBar  on user details')
    //         this.addLike(id)
    // })
    eventBus.$on('openModalFromActionBar', this.addLike)
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
  beforeDestroy (){
  //  eventBus.$off('openModalFromActionBar',   (id) => {
  //           this.addLike(id)
  //   })
   eventBus.$off('openModalFromActionBar', this.addLike)
  },
   destroyed(){
    //eventBus.$off('openModalFromCommentInput')
    // eventBus.$off('openModalFromActionBar', (id) => {
    //         this.addLike(id)
    // })
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
    saveUserDetails(){
    // this.isSaved = !this.isSaved
    this.$store.dispatch({ type: 'updateUser', user : this.user }) 
      this.isSaved = !this.isSaved
    //this.isEdit = !this.isEdit
    },
    editUserDetails(){
      this.isEdit = !this.isEdit
      this.isSaved = !this.isSaved
    },
    imgUserChoosed(uploadedImg){
      console.log('from no user img upload',uploadedImg )
      this.user.imgUrl = uploadedImg  
      this.isEdit = !this.isEdit
    },
    addLike(id){
    //        console.log('add like in user details')
            this.isLiked ?   this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id }) :  this.$store.dispatch({ type: 'setLikeToStory', storyId: id })  
            this.isLiked  = !this.isLiked 
          //    this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id })  <=================  to change back
          //  this.$store.dispatch({ type: 'setLikeToStory', storyId: id })
            //var x = this.isLikedComputed// = !this.isLiked
           // this.storyToShow = this.$store.getters.getStoryByUserId(this.userId);
      //      console.log('add like in user details,   this.storyToShow',this.storyToShow)
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
     //   console.log('comment in user details',commentStory)
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
    // console.log(" conputed in user details:  this.storyToShow.likedBy.length ",this.storyToShow.likedBy.length);
        return this.storyToShow
    },
    followersNum() {
      return this.user.followers.length;
    },
    followingNum() {
      return this.user.following.length;
    },
    numPosts() {
      return this.stories.length;
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
    imgUpload
  },
};
</script>