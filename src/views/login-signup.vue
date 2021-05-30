<template>
  <div class="login-layout">

    <div class="login-container">
     
          <p class="faild-login">{{ msg }}</p>

          <div v-if="loggedinUser">
            <h3 class="login-h3"> Loggedin User:    <span class="login-user-name">   {{ loggedinUser.username }}     </span> </h3>
            <button class="logout-btn" @click="doLogout">Logout</button>
          </div>
          <div v-else>
            <h2>Choose User To Login</h2>
          <div v-if="!loggedinUser"   class="login-warning">  You Need to Login First !      </div>
            <form @submit.prevent="doLogin">
              <select class="login-input" v-model="loginCred.username">
                <!-- <option value="">Select User</option> -->
                <option v-for="user in users" :key="user._id" :value="user.username">{{user.fullname}}</option>
              </select>
            <button class="login-btn">Login</button>
            </form>
            <!-- <p class="mute">user1 or admin, pass:123 </p> -->
            <form @submit.prevent="doSignup">
              <h2>Or Sign Up First</h2>
              <div class="input-padding"> <input  class="login-input"  type="text" v-model="signupCred.fullname" placeholder="Your full name" />  </div>
              <div  class="input-padding" > <input class="login-input"    type="text"  v-model="signupCred.password"  placeholder="Password"  />  </div>
              <div class="input-padding"> <input class="login-input"  type="text"  v-model="signupCred.username"  placeholder="Username" />  </div>
              <button class="signup-btn">Sign Up Now</button>
            </form>
          </div>
          <hr />
          <!-- <details>
            <summary>
              Admin Section
            </summary>
            <ul>
              <li v-for="user in users" :key="user._id">
                <pre>{{ user }}</pre>
                <button @click="removeUser(user._id)">x</button>
              </li>
            </ul>
          </details> -->
    </div>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";
export default {
  name: "test",
  data() {
    return {
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
    async doSignup() {
      console.log('do signup in login-logout')
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = "Please fill up the form"
        return
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.userId = this.$store.getters.loggedinUser._id
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
  }
};
</script>