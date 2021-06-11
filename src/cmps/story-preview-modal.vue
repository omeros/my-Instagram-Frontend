<template>
<section v-if="story" >
    <div class="story-details-content-preview"  @click.stop="closeDeletPost()"  >
                    <!------ user details ----------->
                        <div class="post-details-header-preview">
                            <div class="screen-preview">
                                <router-link :to="`/user/${ story.by._id}`" > <img :src="story.by.imgUrl" class="story-details-img-preview opacity" /></router-link>
                                <span class="post-details-router-name-preview opacity">
                                    <router-link :to="`/user/${ story.by._id}`" class="user-name" > {{ story.by.fullname }} </router-link>
                                </span>
                            </div>
                            <button class="post-details-header-btn-preview opacity"  @click.stop="openDeletPost()">
                                <svg height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
                            </button>
                        </div>
                        <div v-if="isDeletePost">
                            <deleteModal  @removepost=removepost />
                        </div>
        <div class="main-comments-preview">
          <div class="">
                    <div class="user-comment-preview">
                            <!-- <div class="screen-preview"> -->
                              <div class="straight-row">
                                      <router-link :to="`/user/${ story.by._id}`" > <img :src="story.by.imgUrl" class="story-details-img-preview-user-comment opacity" /></router-link>
                                      <span class="heavy opacity">
                                          <router-link :to="`/user/${ story.by._id}`" class="user-name"  > {{ story.by.fullname }} </router-link>
                                      </span> 
                                      <span class="light">{{ story.txt }}</span>
                              </div>
                    </div>
                <div class="story-row-preview" >
                        <div class="comment-preview" v-for="comment in story.comments" :key="comment.id">
                            <storyComment :story="story" :comment="comment" :smiles="smiles" :index="story.comments.indexOf(comment)" :key="componentKey" />
                        </div>
                </div>
          </div>
        </div>   
                        <div class="line"></div>
                        <!------- like and save story -------->
                        <actionBar :story="getStory" />
                        <div class="position-modal">
                                  <!-- smily-modal  -->
                                <div class="smily-modal-preview" v-if="isSmilyModal">
                                  <smileyMoldal   :smiles="smiles"  @smileyToShow=addIcon />
                                </div>
                        </div>
          <!--------- separate-line ----------->
          <div class="line"></div>
          <!------------ post-row ---------------->
          <commentInput :storyId="story._id"   @openSmiley=openSmiley   @closeSmiley=closeSmiley  />        
      </div>
 
    </section>
</template>

<script>
import storyComment from "@/cmps/story-comment.vue";
import actionBar from "@/cmps/action-bar.vue";
import commentInput from "@/cmps/comment-input.vue";
import deleteModal from "@/cmps/delete-modal.vue";
import smileyMoldal from "@/cmps/smiley-modal.vue";
import { eventBus } from "@/services/event-bus.service.js";

export default {
    props: ["story","smiles"],
      data() {
      return {
        isActive: false,
        isLiked : false,
        smile : '',
        isCommntLiked2 : [],
        isModal : false,
        isSmilyModal : false,
        istest : false,
        componentKey : 0,
        isDeletePost : false    
    };
  },
    created() {
    },
    computed: {
      getStory(){
        return this.story
      },
        isCommentLikedCompute : function (commentIdx){
          var theloggedInUser =  this.$store.getters.loggedinUser 
        var isLikedBefor = this.story.comments[commentIdx].likedBy.some(user => {
        return (user._id===theloggedInUser._id)
        })
        return isLikedBefor
    },
  },
  methods: {
    removepost(){
        this.isDeletePost=!this.isDeletePost
        this.$emit("removepost")
    },
    openDeletPost(){
      this.isDeletePost = true
    },
    closeDeletPost(){
      this.isDeletePost = false
    },

    addIcon(smile){
      eventBus.$emit('addIcon',smile)
      this.smile = smile; 
    },
    openSmiley(){
      this.isSmilyModal = !this.isSmilyModal;
    },
    closeSmiley(){
      this.isSmilyModal  = false;
    },
    openModal(storyId){
      this.isModal = true;
    },
    closeModal(){
      this.isModal = false
    },
    removeComment(id) {
    },
    myFilter() {
      this.isActive = !this.isActive;
    },
    addLikeToComment(commentIdx){ 
      this.isCommntLiked2[1]=!this.isCommntLiked2[1]
      var details = {
          storyId :  this.story._id,
          commentIdx : commentIdx
        }
      this.$store.dispatch({ type: 'addLikeToComment', theDetails : details })
    },
  },
  components:{
    storyComment,
    actionBar,
    commentInput,
    smileyMoldal,
    deleteModal
  },
}
</script>

<style>
</style>