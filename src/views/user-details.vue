<template>
  <section class="main-details app-center " v-if="user">
    <div class="profile">
      <div class="img-container">
        <img :src="user.imgUrl" class="details-img" />
      </div>

      <div class="details-container">

          <div class="profile-description-top">
            <h2 class="profile-description-top-username"> {{ user.fullname }} </h2>
          </div>

      <div class="followers-num">

          <span class="profile-count">
            <span class="profile-count-num"> {{ numPosts }}</span>
            posts
          </span>

          <span class="profile-count-others">
            <span  class="profile-count-num"> {{ followersNum }}</span>
        followers
          </span>

          <span class="profile-count-others">
            <span  class="profile-count-num"> {{ followingNum }}</span>
        following
          </span>
      
      </div>

        <div class="profile-description-bio">
          <h3> {{ user.username }} </h3>
          <p>{{ user.bio }}</p>
        </div>

        <!-- <div>
          <p>{{ user.reateAt }}</p>
        </div> -->

      </div>


     </div>

     
      <!-- <div  class="story-container" v-for="story in stories" :key="story._id"> -->

       <div class="profile-posts"   >
            <div class="profile-posts-item"   v-for="story in stories" :key="story._id">
            <!-- <div class="profile-posts"  > -->
            <img :src="story.imgUrl" class="details-stories-img" />
        </div>
    </div>

  </section>
</template>

<script>
// import {userService} from '../services/user.service';

export default {
  name: "user-details",
  data() {
    return {
      userId: null,
      user: null,
      stories: null,
    };
  },
  async created() {
    // const user = await userService.getById(id);
    // this.user = user
  },
  watch: {
    // userId: {
    //   handler() {
    //   this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.userId = this.$route.params.id;

    //  var myJSON = JSON.stringify(this.$store.getters.loggedinUser);
    //  this.user = JSON.parse(myJSON);

    //  console.log("user loged in in user details", this.$store.getters.getUserById( this.userId) );
    this.user = this.$store.getters.getUserById(this.userId);
    // this.user = this.$store.getters.loggedinUser;
    // console.log("user loged in in user details", this.user);
    const storiesToShow = this.$store.getters.getStoryByUserId(this.userId);
    console.log("stories on user-details", storiesToShow);
    this.stories = storiesToShow;
  },
  computed: {
    followersNum() {
      return this.user.followers.length;
    },
    followingNum() {
      return this.user.following.length;
    },
    numPosts() {
      return 0;
    },

    // userLogIn() {
    //   return this.$store.getters.watchedUser;
    // },
    // userId() {
    //   return this.$route.params.id;
    // },
  },
};
</script>