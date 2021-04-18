<template>
   
   <div class="modal-header2 flex "  v-bind:class="{left: myImage }" @click.stop="stayOpen()">

          <div class="image-container-new-story">
              <img  class="image-new-story" v-if="myImage" :src="myImage" width="" height="">
              <div class="flex">
                    <label v-if="!isLoading&&!myImage" for="imgUploader"  @drop.prevent="handleFile" @dragover.prevent="dragOver"  @dragleave="isDragOver = false"  >
                        <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1618335628/upload3_te8f2v.png">
                    </label>

                      <img   v-if="isLoading" class=""  src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/animated-loading-c397-1.gif">
                      <!-- <img   v-if="isLoading" class="input-img"  src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"> -->

                  
                 <!-- <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1617824183/iconfinder_file_add_48761_tfhfua.png" width="" height=""> -->
                 <!-- <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1618335628/upload3_te8f2v.png"> -->
                <input v-if="!myImage"  id="imgUploader" class="file-btn round"  type="file" accept="image/*" @change="uploadImage($event)" >
              </div>
          </div>
          
                <div class="comment-new-story"  >
                        <div class="post-details-header-preview">
                            <div class="screen-preview">
                                <router-link :to="`/user/${ emptyStory.by._id}`" > <img :src="emptyStory.by.imgUrl" class="story-details-img-preview opacity" /></router-link>
                                <span >
                                    <router-link :to="`/user/${ emptyStory.by._id}`"  class="post-details-router-name-preview opacity" > {{ emptyStory.by.fullname }} </router-link>
                                </span>
                            </div>
                            <button class="post-details-header-btn-preview opacity">
                                <svg height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
                            </button>
                        </div>




                    <div class="line2"></div>
                        <commentInput  :storyId="test"    @addComment=addComment   @openSmiley=openSmiley   @closeSmiley=closeSmiley  />
                    <div class="line2"></div>
                    <div class="smily-modal-new-story  " v-if="isSmilyModal">
                        <smileyMoldal   :smiles="smiles"  @smileyToShow=addIcon />
                    </div>

                </div>
              

          <!-- <button >   <img  class="save-btn" v-if="myImage" src="https://res.cloudinary.com/omerphoto/image/upload/v1617099828/save_q9xvig.png" width="20" height="20">
          </button>  
          <label for=""  v-if="myImage" >say somthing : </label>
          <input type="text"  class="my-input" v-if="myImage" > -->
    </div>

</template>

<script>
// import { uploadImg2 } from "@/services/img-upload2.service.js";
import { uploadImg2 } from "@/services/img-upload2.service.js";
import { uploadImg } from "@/services/img-upload.service.js";
import { eventBus } from "@/services/event-bus.service.js";
import commentInput from "@/cmps/comment-input.vue";
import smileyMoldal from "@/cmps/smiley-modal.vue";
import storyService from "@/services/story.service.js";

export default {
  props:["emptyStory","smiles"],
     data() {
        return {
                txt :  null,
                myImage :  null,
                isSmilyModal : false,
                test : '123',
                isLoading: false

        }
      },
   created() {
     console.log('on created ,emptyStory on new story modal',this.emptyStory)
     
   },
   mounted() {
     console.log('on mounted ,emptyStory on new story modal',this.emptyStory)
   },
  methods: {
    addIcon(smile){
      eventBus.$emit('addIcon',smile)
      this.smile = smile; 
    },
      stayOpen(){
         eventBus.$emit('doNotCloseTheNewStoryModal')
      },
        addComment(commentStory){      
        this.emptyStory.txt=commentStory.txt
        this.emptyStory.imgUrl= this.myImage  
        console.log('befor  in  new story modal',this.emptyStory)
        this.emptyStory._id =''
        console.log('after   in  new story modal',this.emptyStory)
        this.$store.dispatch({ type: 'addNewStory', newStory: this.emptyStory })
        this.$emit('afterPost')
        // this.componentKey += 1;
        // this.$forceUpdate(); 
    },
        openSmiley(){
      this.isSmilyModal = !this.isSmilyModal;
    },
    closeSmiley(){
      this.isSmilyModal  = false;
    },
    async uploadImage(ev) {
      this.isLoading = true
      const res = await uploadImg2(ev)
      this.myImage = res.url
      console.log('onUploadImg -> res', res)
      this.isLoading = false
    },
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },
    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.myImage = res.url
     // this.$emit("save", res.url);
      this.isLoading = false;
    },
},

  components:{
    commentInput,
    smileyMoldal,
  },
}
</script>

<style>

</style>