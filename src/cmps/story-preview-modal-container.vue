<template>
      <div class="story-preview-modal">
        <div class="story-preview-modal-content">
            <div v-if="story" class="story-preview-modal-img-container">
              <img :src="story.imgUrl" class="story-preview-img-modal" />
            </div>
            <!-- <div class="story-preview-post-modal">
            </div> -->
              <storyPreviewModal :story="story" :smiles="smiles" @removepost="removepost" />
        </div>
    </div>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
import storyPreviewModal from "@/cmps/story-preview-modal.vue";
export default {
  props: ["story", "smiles"],

  methods: {
    removepost() {
      this.$emit("removepost");
    },
  },
  components: {
    storyPreviewModal,
  },
};
</script>

<style>
</style>