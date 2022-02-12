<template>
  <section class="story-app-container" >
        <storyPreviewModalContainer v-if="selectedStory"   :story="selectedStoryFromComputed" :smiles="smiliesToShow" v-on:click="close" @removepost=removepost  />
        <div @click.stop="closeModal()">
              <div class="app-center" v-if="storiesToShow">
                  <story-list :stories="storiesToShow" @storyToModal=storyToModal :smiles="smiliesToShow"/>
              </div>
        </div>
  </section>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
import { storyService } from "../services/story.service.js";
import storyList from "@/cmps/story-list";
import storyPreviewModalContainer from "@/cmps/story-preview-modal-container";

export default {
      data() {

    return {
    
      filterBy: null,
      loggedinUser : null,
      // storiesToEdit : storyService.getEmptystory(),
      // storiesToEdit : this.$store.getters.getEmptyStory,
      selectedStory : null,
    //  smiliesToShow :  null , // this.$store.getters.smiley,
      isLiked : false
  // this.emptyStory =  this.$store.getters.getEmptyStory
     
   
    };
  },
 async created() {
      eventBus.$on('addLikeFromActionBar',  this.addLikeFromActionBar)
      eventBus.$on('addCommentFromCommentInput', this.addCommentToStory)
      eventBus.$on('addLikeToComment', this.addLikeToComment)
   //   this.smiliesToShow   =  this.$store.getters.smiley
  },
  mounted(){
  },
    beforeDestroy (){
    eventBus.$off('addLikeFromActionBar', this.addLikeFromActionBar)
    eventBus.$off('addCommentFromCommentInput', this.addCommentToStory)
    eventBus.$off('addLikeToComment', this.addLikeToComment)
  },
  destroyed(){
  // this.smiles = storyService.getSmiles()
  //       eventBus.$off('openModalFromActionBar', (id) => {
  //       this.addLikeFromActionBar(id)
  // })
  },

  computed: {
    selectedStoryFromComputed(){
      if(this.selectedStory)
        return  this.$store.getters.getStoryById(this.selectedStory._id)
  },
    smiliesToShow(){
      return this.$store.getters.smiley
    //    console.log('smily in appp ',  smiley)
      
      },
    storiesToShow() {
      return   this.$store.getters.storiesToShow;
      //const storiesToShow = this.$store.getters.storiesToShow;
      // const storiesToShow = this.$store.getters.getStories;
    //  console.log("stories on story App", storiesToShow);
    //  return storiesToShow;
    },

  },
    methods: {
    async getSmilies(){
        this.smiliesToShow =  await this.$store.getters.smiley
        console.log('smily in story-app ',  this.smiliesToShow)
      },
    addLikeFromActionBar(id){
      console.log('addLikeFromActionBar in  story-App',id)
      this.$store.dispatch({ type: 'setLikeToStory', storyId: id })
    },
    addCommentToStory(commentStory){
      console.log('addCommentToStory in story-app')
      this.$store.dispatch({ type: 'addCommentToStory', comment: commentStory })
    },
    addLikeToComment(details){
      this.$store.dispatch({ type: 'addLikeToComment', theDetails : details })
    },
    removepost(){

    },
    close(){
        console.log('close the function !!')
    },
      storyToModal(story){
        //this.selectedStory = null
        this.selectedStory = story
      //  console.log('the story to modal in atory-app', story)
      },
        closeModal(){
          this.selectedStory = null
            eventBus.$emit('closeAddStoryModal')
      }
    },
    components: {
    storyList,
    storyService,
    storyPreviewModalContainer,
  },
}
</script>

<style>

</style>