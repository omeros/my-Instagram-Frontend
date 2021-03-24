<template>
  <div>
    <section class="main home-page">
      <!-- <li   @click=" myFilter"  v-bind:class="{checked : isActive}">{{story}}</li> -->

      <div class="post-details">
        <div class="post-details-header">
             <router-link :to="`/user/${ story.by._id}`" > <img :src="story.by.imgUrl" class="story-details-img" /></router-link>
   
             <router-link :to="`/user/${ story.by._id}`" > {{ story.by.fullname }} </router-link>
             <!-- <p class="post-details-p">{{ story.by.fullname }}</p> -->
        </div>

        <img class="story-img" :src="story.imgUrl" />
        <div class="story-details-contect">
          <div class="story-actions"></div>
          <div>
            <button class="post-likes-btn">1 likes</button>
            <div class="acreen">
              {{ story.txt }}
            </div>
          </div>

          <div class="story-row"></div>

          <div>
            <div class="story-row"></div>
          </div>
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
  name: "story-preview",
  props: ["story"],
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    //   console.log('story in preview',this.story)
    // const usersToShow = this.$store.getters.getUserById(this.userId);
  },
  computed: {
    myToy() {
      return this.toy.name;
    },
  },
  methods: {
    removeToy(id) {
      //console.log('toy id delete from toy preview,' ,id)
      // this.$emit("remotoy", id);
    },
    myFilter() {
      this.isActive = !this.isActive;
    },
  },

  components: {},
};
</script>
