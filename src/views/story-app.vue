<template>
       <section  >
         <storyPreviewModalContainer v-if="selectedStory"   :story="selectedStoryFromComputed" :smiles="smiliesToShow" v-on:click="close" @removepost=removepost  />
         <div @click.stop="closeModal()">
              <div class="app-center" v-if="storiesToShow">
                  <story-list :stories="storiesToShow" @storyToModal=storyToModal />
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
      // storiesToEdit : storyService.getEmptystory(),
      // storiesToEdit : this.$store.getters.getEmptyStory,
      selectedStory : null,
      smiliesToShow : storyService.getSmiles(),
      isLiked : false
  // this.emptyStory =  this.$store.getters.getEmptyStory
     
   
    };
  },
  created() {
   // console.log("story app loaded!!!");
  //   this.$store.dispatch({ type: "loadStories" });
  //         eventBus.$on('openModalFromActionBar', (id) => {
  //         this.addLikeFromActionBar(id)
  // })
  },
   destroyed(){
  // this.smiles = storyService.getSmiles()
  //       eventBus.$off('openModalFromActionBar', (id) => {
  //       this.addLikeFromActionBar(id)
  // })
  },

    computed: {
      selectedStoryFromComputed(){
         return this.selectedStory
      },
    storiesToShow() {
      const storiesToShow = this.$store.getters.storiesToShow;
      // const storiesToShow = this.$store.getters.getStories;
      //console.log("stories on story App", storiesToShow);
      return storiesToShow;
    },

  },
     methods: {
       
    // addLikeFromActionBar(id){
    //   console.log('add like in  story-preview')
    //   if(!this.isLiked){
    //     this.$store.dispatch({ type: 'setLikeToStory', storyId: id })    // <================ to change back
    //     this.isLiked = !this.isLiked
    //    // this.openModal()
    //   }else{
    //     this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id })//  <=================  to change back
    //       this.isLiked = !this.isLiked
    //     //  this.openModal()
    //   }
    // },
       removepost(){

       },
       close(){
             console.log('close the function !!')
       },
      storyToModal(story){
        this.selectedStory = null
        this.selectedStory = story
        console.log('the story to modal in atory-app', story)
       },
       closeModal(){
         this.selectedStory = null
             eventBus.$emit('closeAddStoryModal')
       }
     },
    components: {
    storyList,
    // storyFilter,
    storyService,
    storyPreviewModalContainer
  },
}
</script>

<style>

</style>