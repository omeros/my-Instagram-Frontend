<template>
  <header class="">
    <div class="app-center inner-header">
      <div class="nav-bar main-header-inner">
        <div>
          <router-link to="/" class="instabul-router-link">
            <span class="h1-header"> My Instagram </span>
          </router-link>
        </div>
           <!-- <user-filter /> -->

        <div class="search-container">
        <user-filter @filtered="setFilter" />
        </div>

        <nav>
          <div class="header-links">
            <router-link to="/">
              <span role="img" aria-label="logo"
                ><svg height="30" viewBox="0 0 48 48" width="22">
                  <path
                    d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"
                  ></path></svg
              ></span>
            </router-link>
            <router-link
              v-if="loggedInUser.imgUrl"
              :to="`/user/${loggedInUser._id}`"
              ><img
                class="user-logo"
                :src="loggedInUser.imgUrl"
                alt="profile pic"
            /></router-link>
            <router-link v-else :to="`/login`"
              ><img
                class="user-logo"
                src="https://picsum.photos/id/305/200/300"
                alt="profile pic"
            /></router-link>
            <router-link to="/login" class="instabul-router-link"
              >Login / Signup</router-link
            >
          </div>
        </nav>
      </div>
      <!-- <router-link to="/users">users</router-link> -->
      <!-- <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link> -->
      <!-- <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section> -->
    </div>
  </header>
</template>
<script>
import userFilter from "@/cmps/user-filter.vue";
// import userFilter from "./user-filter.vue";
export default {
  name: "app-header",
    data() {
      return {
         filterBy: null,
      }
    },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
     methods: {
          setFilter(filterBy) {
            console.log("set filter is running", filterBy);
            this.$store.commit({ type: "filterByChanged", strFilter: filterBy });
          },

          goHome() {
        console.log("instanbul pressed");
        //  this.$router.push('/')
      },
    },
  
  components: {
    userFilter,
  },
};
</script>