<template>
  <section class="main-layout" v-if="user">

    {{user}}
    <!-- <h1>User Details - {{ user.fullname }}</h1>
    <h3>{{ user.username }} score: {{ user.score }}</h3>
    <ul>
      <li v-for="review in user.givenReviews" :key="review._id">
        {{ review.txt }}
        <router-link :to="`/user/${review.aboutUser._id}`">
          About {{ review.aboutUser.fullname }}
        </router-link>
      </li>
    </ul>

    <details>
      <summary>Full JSON</summary>
      <pre>{{ user }}</pre>
    </details> -->
  </section>
</template>

<script>
// import {userService} from '../services/user.service';

export default {
    name: "user-details",
  data() {
    return {
      userId : null,
       user: null
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
    mounted(){
         this.userId= this.$route.params.id;
         console.log('user is Id ',this.userId)

            //  var myJSON = JSON.stringify(this.$store.getters.loggedinUser);
            //  this.user = JSON.parse(myJSON);

            this.user = this.$store.getters.loggedinUser
             console.log('user loged in in user details',this.user)
    },
  computed: {
    // userLogIn() {
    //   return this.$store.getters.watchedUser;
    // },
    // userId() {
    //   return this.$route.params.id;
    // },
  },
};
</script>