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
          <div class="mytest">

               
                    <div class="user-comment-preview">
                            <!-- <div class="screen-preview"> -->
                              <div class="straight-row">
                                      <router-link :to="`/user/${ story.by._id}`" > <img :src="story.by.imgUrl" class="story-details-img-preview-user-comment opacity" /></router-link>
                                      <span class="heavy opacity">
                                          <router-link :to="`/user/${ story.by._id}`" class="user-name"  > {{ story.by.fullname }} </router-link>
                                      </span> 
                                      <span class="light">{{ story.txt }}</span>
                              </div>
                                  <button class="post-actions-btn-like-first-preview opacity" @click="addLikeToComment(0)">
                                        <!-- <svg  height="24" viewBox="0 0 48 48" width="24" class="notlike-comment-preview likeAnimation"   v-bind:class="{'like-comment-preview': story.comments.indexOf(comment) }" ><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> -->
                                        <svg v-if="isCommntLiked2[0]" height="24" viewBox="0 0 48 48" width="24" class="like-comment-preview likeAnimation"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                        <svg  v-else  height="24" viewBox="0 0 48 48" width="24" class="nolike-comment-preview"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                </button>
                            <!-- </div> -->
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
          <commentInput :storyId="story._id"  @addComment=addComment  @openSmiley=openSmiley   @closeSmiley=closeSmiley  />        
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
          //   eventBus.$on('test', () => {
     //        console.log('update commponent',this.story)
          //   this.componentKey += 1;
          // })
     // console.log('smiles in story-modal-modal',this.smile)
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
     //   console.log('remove the post from father')
        this.isDeletePost=!this.isDeletePost
     //    this.$store.dispatch({ type: 'removeStory', storyId: this.story._id })
          this.$emit("removepost")
    },
    // addComment(commentStory){
    //     this.emptyStory.txt=commentStory.txt
    //     this.emptyStory.imgUrl= this.myImage
    //     this.$store.dispatch({ type: 'addNewStory', newStory: this.emptyStory })
    //     // this.componentKey += 1;
    //     // this.$forceUpdate(); 
    // },
    openDeletPost(){
      this.isDeletePost = !this.isDeletePost
     // console.log('delete post id : ',this.story._id)
    },
    closeDeletPost(){
      this.isDeletePost = !this.isDeletePost
     // console.log('delete post id : ',this.story._id)
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
    addLike(id){
       // this.$store.dispatch({ type: 'setLikeToStory', storyId: id })
      //  this.isLiked = !this.isLiked  
    },
    addComment(commentStory){
        // var commentStory ={
        //   txt : this.txt,
        //   storyId : id,
        // } 
        console.log('the story to comment in story preview modal',commentStory)
        this.$store.dispatch({ type: 'addCommentToStory', comment: commentStory })
        // this.componentKey += 1;
        // this.$forceUpdate();
     
    },
    isCommentLikedfunc(commentIdx)
    {
      var theloggedInUser =  this.$store.getters.loggedinUser 
      var isLikedBefor = this.story.comments[commentIdx].likedBy.some(user => {
        return (user._id===theloggedInUser._id)
      })
       return isLikedBefor
    }




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