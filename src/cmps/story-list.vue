<template>
  <section class="story-app-container">
    <div class="story-list-container">
      <div  class="story-container" v-for="story in stories" :key="story._id">
        <!-- <story-preview :story="story" >   <router-view /> </story-preview> -->
        <story-preview :story="story"  @storyToModal=storyToModal >   </story-preview>
     </div>
    </div>
  </section>
</template>

<script>
import storyPreview from "@/cmps/story-preview.vue";
export default {
  props: {
    stories: {
      type: Array,
    },
  },
     mounted (){
  //      console.log('story in list',this.stories)
      },
       methods: {
         storyToModal(story){
    //       console.log('open modal is story ',story)
           this.$emit("storyToModal",story)
         }
       },

  components: {
    storyPreview,
  },
};
</script>

<style>
</style>
