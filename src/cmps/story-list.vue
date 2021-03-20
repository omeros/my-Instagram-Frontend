<template>
  <section class="gig-app-container">
    <div class="gig-list-container">
      <div  class="gig-container" v-for="story in stories" :key="story._id">
        <story-preview :story="story" />
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
        console.log('story in list',this.stories)
      },
  components: {
    storyPreview,
  },
};
</script>

<style>
</style>
