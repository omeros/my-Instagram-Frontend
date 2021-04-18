<template>
  <section  >

  <transition name="fade">
      <div class="absolute-pos" v-if="loggedinUser&&isChat" >
          <div  class="fixed-pos"  >
            <storyChat :userId="myId" />
          </div>
      </div>
  </transition>
    <div class="btn-absolute-pos" >
      <div  class="btn-absolute-pos">
        <button  class="open-chat" @click.stop="openChat()" v-if="!isChat"> Open Chat </button>
        <button  class="open-chat" @click.stop="openChat()" v-if="isChat"> Close Chat </button>
      </div>
    </div>
        <storyPreviewModalContainer v-if="selectedStory"   :story="selectedStoryFromComputed" :smiles="smiliesToShow" v-on:click="close" @removepost=removepost  />
        <div @click.stop="closeModal()">
              <div class="app-center" v-if="storiesToShow">
                  <story-list :stories="storiesToShow" @storyToModal=storyToModal :smiles="smiliesToShow"/>
              </div>
        </div>
  </section>
</template>

<script>
import storyChat from "@/cmps/story-chat.vue";
import { eventBus } from "@/services/event-bus.service.js";
import { storyService } from "../services/story.service.js";
import storyList from "@/cmps/story-list";
import storyPreviewModalContainer from "@/cmps/story-preview-modal-container";

export default {
      data() {

    return {
      isChat : false,
      filterBy: null,
      loggedinUser : this.$store.getters.loggedinUser,
      // storiesToEdit : storyService.getEmptystory(),
      // storiesToEdit : this.$store.getters.getEmptyStory,
      selectedStory : null,
     // smiliesToShow :  null , // this.$store.getters.smiley,
      isLiked : false
  // this.emptyStory =  this.$store.getters.getEmptyStory
     
   
    };
  },
  created() {
 //this.getSmilies()
   // console.log("story app loaded!!!");
  //   this.$store.dispatch({ type: "loadStories" });
  //         eventBus.$on('openModalFromActionBar', (id) => {
  //         this.addLikeFromActionBar(id)
  // })
  },
   destroyed(){
  // this.smiles = storyService.getSmiles()
  //       eventBus.$off('openModalFromActionBar', (id) => {
  //       this.addLikeFromActionBar(id)
  // })
  },

    computed: {
    myId(){
        return  this.loggedinUser._id
    },
      selectedStoryFromComputed(){
        return this.selectedStory
      },
      smiliesToShow(){
        const smiley =   this.$store.getters.smiley
        console.log('smily in appppppppppppppp from aaaaaaaaaaaaaaaa',  smiley)
        return smiley
      },
    storiesToShow() {
      const storiesToShow = this.$store.getters.storiesToShow;
      // const storiesToShow = this.$store.getters.getStories;
      console.log("stories on story App", storiesToShow);
      return storiesToShow;
    },

  },
    methods: {
      openChat(){
         this.isChat = !this.isChat
      },
      async getSmilies(){
        var smiley =  await this.$store.getters.smiley
        console.log('smily in appppppppppppppp from aaaaaaaaaaaaaaaa',  smiley)
        this.smiliesToShow= smiley
      //  console.log('smily in appppppppppppppp from bbbbbbbbbbbbbbbbbbb',  this.smiliesToShow)
      },
  
    // addLikeFromActionBar(id){
    //   console.log('add like in  story-preview')
    //   if(!this.isLiked){
    //     this.$store.dispatch({ type: 'setLikeToStory', storyId: id })    // <================ to change back
    //     this.isLiked = !this.isLiked
    //    // this.openModal()
    //   }else{
    //     this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id })//  <=================  to change back
    //       this.isLiked = !this.isLiked
    //     //  this.openModal()
    //   }
    // },
       removepost(){

       },
       close(){
             console.log('close the function !!')
       },
      storyToModal(story){
        this.selectedStory = null
        this.selectedStory = story
        console.log('the story to modal in atory-app', story)
       },
       closeModal(){
         this.selectedStory = null
             eventBus.$emit('closeAddStoryModal')
       }
     },
    components: {
    storyList,
    storyChat,
    storyService,
    storyPreviewModalContainer,
  },
}
</script>

<style>

</style>