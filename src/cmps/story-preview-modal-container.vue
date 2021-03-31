<template>
      <div class="abc">
         <div class="story-preview-modal ">
            <div  class="story-preview-modal-content ">
                <div class="story-preview-modal-img-container">
                  <img :src="story.imgUrl" class="story-preview-img-modal"/>
                </div>
                <div class="story-preview-post-modal"> 
                  <storyPreviewModal :story="story" :smiles="smiles" />
                </div>
            </div>
          </div>
      </div>
</template>

<script>
import storyPreviewModal from "@/cmps/story-preview-modal.vue";
export default {
      props: ["story","smiles"],


  components: {
    storyPreviewModal,
  },
};

 
</script>

<style>

</style>