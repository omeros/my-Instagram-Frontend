<template>
       <section  >
       <!-- <section  > -->
         <storyPreviewModalContainer v-if="selectedStory"  :story="selectedStory" :smiles="smiliesToShow" v-on:click="close" />
         <div @click.stop="closeModal()">
              <div class="app-center">
                  <story-list :stories="storiesToShow" @storyToModal=storyToModal />
              </div>
         </div>
        </section>
</template>

<script>
import { storyService } from "../services/story.service.js";
import storyList from "@/cmps/story-list";
import storyPreviewModalContainer from "@/cmps/story-preview-modal-container";

export default {
      data() {

    return {
      filterBy: null,
      storiesToEdit : storyService.getEmpthystory(),
      selectedStory : null,
      smiliesToShow : storyService.getSmiles(),

     
   
    };
  },
  created() {
   // console.log("story app loaded!!!");
    this.$store.dispatch({ type: "loadStories" });

  },
    computed: {
    storiesToShow() {
      const storiesToShow = this.$store.getters.storiesToShow;
      // const storiesToShow = this.$store.getters.getStories;
      //console.log("stories on story App", storiesToShow);
      return storiesToShow;
    },

  },
     methods: {
       close(){
             console.log('close the function !!')
       },
      storyToModal(story){
        this.selectedStory = story
        console.log('the story to modal in atory-app', story)
       },
       closeModal(){
         this.selectedStory = null
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