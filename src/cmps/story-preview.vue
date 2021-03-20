<template>
 <div>

   <section class="main home-page">


               
                          <!-- <li   @click=" myFilter"  v-bind:class="{checked : isActive}">{{story}}</li> -->
                  
                      <div class="post-details">
                          <img class="story-img" :src="story.imgUrl" />
                          <div class="story-details-contect">
                                <div class="story-actions"></div>
                                <div>
                                  <button class="post-likes-btn">1 likes</button>
                                  <div class="acreen">
                                  </div>
                                </div>

                                <div class="story-row">
                                </div>

                                <div>
                                  <div class="story-row"></div>
                                </div>
                                     

                                      {{story.txt}}
                          </div>
                      </div>
                
                      <!-- <button @click="removeToy(toy._id)">Delete </button>
                      <router-link class="edit-link" :to="'/toy-edit/'+toy._id">Edit  </router-link> 
                      <router-link class="details-link" :to="'/toy-details/'+toy._id"> Details  </router-link> 
                      <router-link class="review-link" :to="'/toy-review/'+toy._id"> add Review  </router-link>  -->



   </section>

 </div>

</template>

<script>

export default {
  name: 'story-preview',
     props:['story'],
             data() {
          return {
            isActive: false,
      
          }
      },
      mounted (){
        console.log('story in preview',this.story)
      

      },
          computed: {
      myToy(){
          return this.toy.name
      },
     },
     methods: {
  removeToy(id){
    //console.log('toy id delete from toy preview,' ,id)
    // this.$emit("remotoy", id);
},
   myFilter() {
  this.isActive = !this.isActive;
},
     },
    

  components: {
  }
}
</script>
