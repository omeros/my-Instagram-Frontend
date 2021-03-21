<template>
  <section class=" main-details" v-if="user">



   <div>
        <img :src="user.imgUrl" class="details-img" >
    </div>

    <div class="details-container">


        <div> 
            <p>{{user.fullname}}</p>
        </div>

        <div>
          <p> {{numPosts}} posts</p>
        </div>
        <div>
          <p> {{user.username}}</p>
        </div>
        <div>
          <p> {{user.bio}}</p>
        </div>

      

        <div>
        <p>   {{user.reateAt}}</p>
        </div>

        <div>
          <p>following :   {{followingNum}}</p>
        </div>

        <div>
        <p>   followers : {{followersNum}}</p>
        </div>

      

    </div>

   stories 
        <img :src="stories.imgUrl" class="stories-img" >
    
       <p>    {{stories.txt}}</p>
    <div>

    </div>


  </section>
</template>

<script>
// import {userService} from '../services/user.service';

export default {
    name: "user-details",
  data() {
    return {
      userId : null,
       user: null,
       stories : null,
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
   

            //  var myJSON = JSON.stringify(this.$store.getters.loggedinUser);
            //  this.user = JSON.parse(myJSON);

            this.user = this.$store.getters.loggedinUser
             console.log('user loged in in user details',this.user)
              const storiesToShow = this.$store.getters.getStoryByUserId(this.userId);
              console.log('stories on user-details',storiesToShow)
              this.stories = storiesToShow;
    },
  computed: {
     followersNum(){
      return this.user.followers.length
    },
      followingNum(){
      return this.user.following.length
    },
    numPosts(){
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