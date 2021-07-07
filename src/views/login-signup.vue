<template>
  <div class="login-layout" @click.self="closecreatNewUser">
    <div class="login-container" @click.self="closecreatNewUser">    
          <p class="faild-login">{{ msg }}</p>
          <div v-if="loggedinUser">
            <h3 class="login-h3"> Loggedin User:    <span class="login-user-name">   {{ loggedinUser.username }}     </span> </h3>
            <button class="logout-btn" @click="doLogout">Log Out</button>
          </div>
          <div v-else>
                <h2>   You Need to Login First ! </h2>
              <div v-if="!loggedinUser"   class="login-warning">  Choose User To Login     </div>
                <form @submit.prevent="doLogin" class="login-form">
                  <select class="login-input" v-model="loginCred.username">
                    <!-- <option value="">Select User</option> -->
                    <option v-for="user in users" :key="user._id" :value="user.username">{{user.fullname}}</option>
                  </select>
                  <div class="login-btn-container"></div>
                  <button class="login-btn">Log In</button>
                  <div class="login-line"></div>
                  <div class="new-account-btn-separation"></div>
                  <button class="newaccount-btn" @click.prevent="creatNewUser" >Creat New Account</button> 
                </form>
              <transition name="fade2">
                <div class="signup-container" v-if="newUserModal">
                  <signup  @signupCred=doSignup />
                </div>
              </transition>
          </div>
       

    </div>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";
import signup from "@/cmps/signup";

export default {
  name: "login-signup",
  data() {
    return {
      newUserModal : false,
      userId : null,
      msg: "",
      loginCred: {username: 'victoria_o', password: '1234'},
      signupCred: {username: '', password: '', fullname: ''},
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
 //   console.log('login user in login loguot ', this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  async created() {
    // const userToLogin = this.$store.getters.users
    // this.loginCred.username = userToLogin[3].username ;
    // console.log('created at login  ',  this.loginCred.username)
    // this.doLogin()

   
    
  },
  methods: {
    closecreatNewUser(){
        this.newUserModal = false
    },
    creatNewUser(){   
      this.newUserModal = !this.newUserModal 
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password"
        return;
      }
      try {
     //   console.log('doing login with : ,',this.loginCred)
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        const loginUser = this.$store.getters.loggedinUser
        // const loggedinUser = this.$store.getters.loggedinUser;
         //  socketService.emit("updateLoginUser",loggedinUser);
        socketService.emit("user-connected-details", loginUser); 
        //this.userId = this.$store.getters.loggedinUser._id
        this.userId = loginUser._id
        this.$router.push(`/user/${this.userId}`)
          // this.$router.push('/')
      } catch(err) {
          console.log(err)
          this.msg = "Failed to login"
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      socketService.emit("user-disconnect", this.$store.getters.loggedinUser); 
    },
    async doSignup(signupCred) {
      console.log('do signup in login-logout')
      if (!signupCred.fullname || !signupCred.password || !signupCred.username) {
        this.msg = "Please fill up the form"
        return
      }
      this.newUserModal = false
      await this.$store.dispatch({ type: "signup", userCred: signupCred });
      this.userId = this.$store.getters.loggedinUser._id
      await this.$store.dispatch({ type: "loadStories" });
      await this.$store.dispatch({ type: "loadUsers" });
      this.$router.push(`/user/${this.userId}`) 
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch(err) {
        this.msg = 'Failed to remove user'
      }
    }
  },
    components: {
    signup
  },
};
</script>