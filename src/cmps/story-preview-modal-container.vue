<template>
  <!-- <div class="abc" > -->
  <div class="abc" @click.stop="stayOpen()">
    <div class="story-preview-modal">
      <div class="story-preview-modal-content">
        <div v-if="story" class="story-preview-modal-img-container">
          <img :src="story.imgUrl" class="story-preview-img-modal" />
        </div>
        <div class="story-preview-post-modal">
          <storyPreviewModal
            :story="story"
            :smiles="smiles"
            @removepost="removepost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
import storyPreviewModal from "@/cmps/story-preview-modal.vue";
export default {
  props: ["story", "smiles"],

  methods: {
    stayOpen() {
      eventBus.$emit("doNotCloseTheModal");
    },
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