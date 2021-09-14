<template>
    <section class="main" >
      <div class="story-father" >
      <div class="post-details">
        <div class="post-details-header">
            <div class="screen-preview">
              <router-link :to="`/user/${ story.by._id}`" > <img :src="story.by.imgUrl" class="story-details-img opacity" /></router-link>
                <span class="post-details-router-name opacity">
                <router-link :to="`/user/${ story.by._id}`" class="story-name" > {{ story.by.fullname }} </router-link>
              </span>
          </div>
          <button class="post-details-header-btn opacity">
              <svg height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
          </button>
        </div>

                    <!------ Main image ------->
        <img class="story-img" :src="story.imgUrl" />

          <!------------ main-post-details-content --------------->
      <div class="story-details-content"  @click.stop="closeModal()" >
        <div class="post-actions">

            <div class="post-btn"  >
            <button class="post-actions-btn-like opacity" @click.stop="addLike(story._id)">
              <svg v-if="isLiked" height="24" viewBox="0 0 48 48" width="24" class="like likeAnimation"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              <svg  v-else  height="24" viewBox="0 0 48 48" width="24" class="nolike"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            </button>
              <button class="post-actions-btn opacity">
              <svg height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
              </button>
              <button class="post-actions-btn opacity">
                <svg aria-label="Share Post" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
              </button>
            </div>
              <button class="post-actions-btn opacity">
                <svg aria-label="Save" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
              </button>
        </div>

          <div>
            <button class="post-like-btn"> {{story.likedBy.length}} likes </button>
          </div>
              
          <div class="story-actions"></div>
              <div>
                <div class="screen">
                <span class="story-name"> {{ story.by.fullname }}  </span>   
                  {{ story.txt }}
              </div>
            </div>

            <a class="view-comments"  v-if="story.comments.length>2" tabindex="0"  @click.stop="openModal()">View all <span>{{story.comments.length}}</span> comments</a>
            <!-- <button  @click.stop="openModal(story._id)">  View all <span>{{story.comments.length}}</span> comment    </button> -->
    
          <div class="story-row" v-if="story.comments.length>0" >
              <div class="comment">
                <div>
                  <span class="story-name"> {{ story.comments[0].by.fullname }} </span>
                  <span> {{  story.comments[0].txt }} </span>
                </div>
                    <button class="post-actions-btn-like opacity" @click="addLikeToComment(story._id,0)">
                            <svg v-if="isCommntLiked[0]" height="24" viewBox="0 0 48 48" width="24" class="like-comment likeAnimation"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                            <svg  v-else  height="24" viewBox="0 0 48 48" width="24" class="nolike-comment"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                    </button>
              </div>
              <div class="comment"  v-if="story.comments.length>1" >
                  <div>
                    <span class="story-name"> {{ story.comments[1].by.fullname }} </span>
                    <span> {{  story.comments[1].txt }} </span>
                  </div>
                    <button class="post-actions-btn-like opacity" @click="addLikeToComment(story._id,1)">
                            <svg v-if="isCommntLiked[1]" height="24" viewBox="0 0 48 48" width="24" class="like-comment likeAnimation"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                            <svg  v-else  height="24" viewBox="0 0 48 48" width="24" class="nolike-comment"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                    </button>
              </div>
          </div>   

                    <!-- smily-modal  -->
          <div class="smily-modal  hide" v-bind:class="{show: isSmilyModal }">
            <div class="inner-smily-modal">
                <div class="smily-most-popular"> Most Popular </div>
                  <div class="grid-container">
                    <div class="smily-grid">
                      <div  class="smily-img " v-for="s in smiles" :key="s._id">
                        <img  :src="s.url"  @click="addIcon(s._id)">
                    </div>
                  </div>
                </div>
            </div>
          </div>
    
        </div>
      
                    <!-- post-row -->
        <div class="post-details-add-comment">
          <div class="smily-btn" @click.stop="openSmily()">
            <svg aria-label="Emoji" class="" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>
          </div>
            <textarea name="" :id="story._id" cols="" rows="1" placeholder="add a comment..." @click.stop="closeSmily()" class="comment-input"   v-model="txt"   ></textarea>
            <button class="post-details-add-comment-btn "  @click="addComment(story._id)" v-bind:class="{istxt: txt }">Post</button>
        </div>

      </div>
  </div>

  </section>

</template>

<script>
export default {
  name: "story-preview",
  props: ["story","smiles"],
  data() {
    return {
      isActive: false,
      isLiked : false,
      txt : '',
      isCommntLiked : [],
      isModal : false,
      isSmilyModal : false,
    };
  },
  created(){
  //  console.log('smiles in story-preview',this.smiles)
  },
  mounted() { 
  },
  destroyed(){ 
  },

  computed: {
    getDetails(){
      return  {
        story : this.story,
        icons : this.icons
      }
      },
  },
  methods: {
    addCommentToStory(commentStory){
      if(this.story._id===commentStory.storyId){
         // console.log('yesssssssssssssssssssssssssssssssssssss')
          this.txt=commentStory.txt
          this.addComment(commentStory.storyId)
      }
    },
    ifThisIsTheModal(id){
      if(this.story._id===id){
       //     console.log('the bus evemt from actionbar in  story-preview from bus',id)
      
            this.addLike(id)
           //this.addLikeFromModal(id)
           // this.openModal()
        }

    },
    addIcon(id){
    const smile = this.smiles.filter(smile => {
      return (smile._id===id)
    })
      console.log('emoji in story-preview',smile[0].emoji) 
      !this.txt ?  this.txt = String.fromCodePoint(smile[0].emoji) : this.txt += String.fromCodePoint(smile[0].emoji)
    },
    openSmily(){
        this.isSmilyModal = !this.isSmilyModal;
    },
    closeSmily(){
        this.isSmilyModal  = false;
    },
    openModal(){
        this.$emit("storyToModal", this.story);
    },
    closeModal(){
        this.isModal = false
    },
    removeComment(id) {
      //console.log('comment id delete from story preview,' ,id)
      // this.$emit("removeComment", id);
    },
    myFilter() {
      this.isActive = !this.isActive;
      
    },
    addLikeToComment(id,commentIdx){ 
      if(!this.isCommntLiked[commentIdx]){
        this.isCommntLiked[commentIdx]=true
    }else{
        this.isCommntLiked[commentIdx]=false
    }
        var details = {
          storyId :id,
          commentIdx :commentIdx
          }
        this.$store.dispatch({ type: 'addLikeToComment', theDetails : details })

    },
    addLike(id){
      console.log('add like in  story-preview')
      if(!this.isLiked){
        this.$store.dispatch({ type: 'setLikeToStory', storyId: id })    // <================ to change back
        this.isLiked = !this.isLiked
        }else{
        this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id })//  <=================  to change back
        this.isLiked = !this.isLiked
      }
    },

    addLikeFromModal(id){
   //   console.log('add like in  story-preview')
      if(!this.isLiked){
        this.$store.dispatch({ type: 'setLikeToStory', storyId: id })    // <================ to change back
        this.isLiked = !this.isLiked
        this.openModal()
      }else{
        this.$store.dispatch({ type: 'removeLikeFromStory', storyId: id })//  <=================  to change back
          this.isLiked = !this.isLiked
          this.openModal()
      }
    },

    addComment(id){
        var commentStory ={
          txt : this.txt,
          storyId : id,
        } 
        this.$store.dispatch({ type: 'addCommentToStory', comment: commentStory })
        this.txt = null;
        this.closeSmily()
          this.openModal()
    }

  },

  components: {
    
  },
};
</script>
