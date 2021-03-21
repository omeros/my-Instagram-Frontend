<template>
      <section class="main-layout">
 

          <!-- <toy-filter @filtered="setFilter" /> -->
    <!-- <story-list :toys="toysToShow" @remtoy="removeToy" /> -->

    <story-list :stories="storiesToShow" class="item1" />
  
      </section>
</template>

<script>
import { storyService } from "../services/story.service.js";
import storyList from "@/cmps/story-list";
// import storyFilter from "@/cmps/story-filter";
export default {
      data() {

    return {
      filterBy: null,
      storiesToEdit : storyService.getEmpthystory(),
     
   
    };
  },
  created() {
   // console.log("story app loaded!!!");
    this.$store.dispatch({ type: "loadStories" });

  },
    computed: {
    storiesToShow() {
      const storiesToShow = this.$store.getters.getStories;
      //console.log("stories on story App", storiesToShow);
      return storiesToShow;
    },
  },
    components: {
    storyList,
    // storyFilter,
    storyService,
  },
}
</script>

<style>

</style>