<template>
   
   <div class="modal-header2 flex "  v-bind:class="{left: myImage }" @click.stop="stayOpen()">

          <div class="image-container-new-story">
              <img  class="image-new-story" v-if="myImage" :src="myImage" width="" height="">
              <div class="flex">
                 <!-- <img  class="input-img"  src="https://res.cloudinary.com/omerphoto/image/upload/v1617824183/iconfinder_file_add_48761_tfhfua.png" width="" height=""> -->
                <input v-if="!myImage"  class="file-btn round"  type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
              </div>
          </div>
          
                <div class="comment-new-story"  >
                        <div class="post-details-header-preview">
                            <div class="screen-preview">
                                <router-link :to="`/user/${ emptyStory.by._id}`" > <img :src="emptyStory.by.imgUrl" class="story-details-img-preview opacity" /></router-link>
                                <span class="post-details-router-name-preview opacity">
                                    <router-link :to="`/user/${ emptyStory.by._id}`"  > {{ emptyStory.by.fullname }} </router-link>
                                </span>
                            </div>
                            <button class="post-details-header-btn-preview opacity">
                                <svg height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
                            </button>
                        </div>




                    <div class="line2"></div>
                    <commentInput  :storyId="test"    @addComment=addComment   @openSmiley=openSmiley   @closeSmiley=closeSmiley  />
                    <div class="line2"></div>
                </div>
              

          <!-- <button >   <img  class="save-btn" v-if="myImage" src="https://res.cloudinary.com/omerphoto/image/upload/v1617099828/save_q9xvig.png" width="20" height="20">
          </button>  
          <label for=""  v-if="myImage" >say somthing : </label>
          <input type="text"  class="my-input" v-if="myImage" > -->
    </div>

</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
import commentInput from "@/cmps/comment-input.vue";
import storyService from "@/services/story.service.js";

export default {
  props:["emptyStory"],
     data() {
        return {
                txt :  null,
                myImage :  null,
                isSmilyModal : false,
                test : '123'
        }
      },
   created() {
     console.log('on created ,emptyStory on new story modal',this.emptyStory)
     
   },
   mounted() {
     console.log('on mounted ,emptyStory on new story modal',this.emptyStory)
   },
  methods: {
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
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
              console.log('loaded file',e)
                this.myImage = e.target.result;
                //console.log('somethinggg',this.myImage);
            };
                  
                      
        }
},

  components:{
    commentInput,
  },
}
</script>

<style>

</style>