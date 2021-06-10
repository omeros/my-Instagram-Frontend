<template>
  

                <div class="screen-comment"> 
                        <div class="straight-row">
                                <router-link :to="`/user/${ comment.by._id}`" > <img :src="comment.by.imgUrl" class="user-img-comment opacity" /></router-link>
                                <router-link :to="`/user/${ comment.by._id}`" class="heavy-comment " >  {{ comment.by.fullname }} </router-link>
                                <span class="light-comment"> {{  comment.txt }} </span>
                              
                        </div>
                    
                        <button class="opacity test"   @click.stop="addLikeToComment()">
                                  <svg v-if="isLikedComputed" height="24" viewBox="0 0 48 48" width="24" class="like-comment likeAnimation"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                  <svg  v-else  height="24" viewBox="0 0 48 48" width="24" class="notlike-comment small"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                        </button>
                </div>
      
 


</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
export default {
      props: ["story","comment","smiles","index"],
      data() {
      return {
        isActive: false,
        isLiked : false,
        isSmilyModal : false,
        thisCommentIndex : 0
  
    };
  },
  created() {
  },
      computed: {
        isLikedComputed(){
          const loggedinUser = this.$store.getters.loggedinUser;
          const storyUpdated = this.$store.getters.getStoryById(this.story._id)
          const commentToLike = storyUpdated.comments[this.index]
                const isContainUser = commentToLike.likedBy.some((userToFind)=>{
                return (loggedinUser._id === userToFind._id)
          })
          return isContainUser
          //       const isContainComment = storyUpdated.comments.some((commentToFind)=>{
          //       return (this.comment.id === commentToFind.id)
          // })
          // if(isContainComment){
          //       const commentToLikeOrNot = storyUpdated.comments.filter((commentToFind)=>{
          //       return (this.comment.id === commentToFind.id)
          //   })
          // }
          //       const isContainUser = this.story.likedBy.some((userToFind)=>{
          //       return (loggedinUser._id === userToFind._id)
          // })
          // return isContainUser
      }
      },
  methods: {
    addLikeToComment(){ 
      console.log(' comment liked ')
      const details = {
          storyId :  this.story._id,
          commentIdx : this.index
        }
      eventBus.$emit('addLikeToComment',details)
      //this.$store.dispatch({ type: 'addLikeToComment', theDetails : details })
     // this.isLiked = !this.isLiked ;
      //console.log(' is liked  , and details : ',details)
  },
  },
}
</script>

<style>

</style>