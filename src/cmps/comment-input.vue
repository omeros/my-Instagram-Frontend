<template>
  <div class="comment-input-row">
    <div class="comment-smiley-btn" @click.stop="openSmiley()">
      <svg
        aria-label="Emoji"
        class=""
        fill="#262626"
        height="24"
        viewBox="0 0 48 48"
        width="24"
      >
        <path
          d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"
        ></path>
        <path
          d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"
        ></path>
      </svg>
    </div>
    <textarea
      name=""
      id="storyId"
      cols=""
      rows="1"
      placeholder="add a comment..."
      @click.stop="closeSmiley()"
      class="comment-input-preview"
      v-model="txt"
    ></textarea>
    <button
      class="add-comment-btn"
      @click="addComment(storyId)"
      v-bind:class="{ istxt: txt }"
    >
      Post
    </button>
  </div>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
export default {
  props: ["storyId"],
  data() {
    return {
      isLiked: false,
      txt: "",
    };
  },

  created() {
    eventBus.$on("addIcon", (smile) => {
      this.addIconToComment(smile);
    });
  },
  destroyed() {
    eventBus.$off("addIcon", (smile) => {
      console.log("what do you want?");
      this.addIconToComment(smile);
    });
  },

  methods: {
    addComment() {
      var commentStory = {
        txt: this.txt,
        storyId: this.storyId,
      };
      this.$store.dispatch({
        type: "addCommentToStory",
        comment: commentStory,
      });
      this.txt = null;
      this.closeSmiley();
      eventBus.$emit("test"); // this.$forceUpdate();
    },
    addIconToComment(smile) {
      var x = smile;
      this.txt += String.fromCodePoint(x[0].emoji);
    },
    openSmiley() {
      // console.log('from sun')

      this.$emit("openSmiley");
      // this.isSmilyModal = !this.isSmilyModal;
    },
    closeSmiley() {
      this.$emit("closeSmiley", true);
      // this.isSmilyModal  = false;
    },
  },
  computed: {
    inputTxt() {
      console.log("this.txtx", this.txt);
      //   if (this.iconToShow){

      this.txt + String.fromCodePoint(this.iconToShow[0].emoji);
      //   }

      // console.log('this.iconToShow :',this.iconToShow[0].emoji)
      //  this.txt += String.fromCodePoint(this.iconToShow[0].emoji);
      //  console.log('in comment input')
      //  if (this.iconToShow[0]){
      //    console.log('this.iconToShow :',this.iconToShow[0].emoji)
      //     return  this.txt += String.fromCodePoint(this.iconToShow[0].emoji);

      //  }else{
      //     return this.txt
      //  }
      // return  this.txt + String.fromCodePoint(this.iconToShow[0].emoji);
      //    return this.txt
    },
  },
};
</script>

<style>
</style>