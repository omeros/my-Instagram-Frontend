<template>
  <div class="container about main-layout">
    <p>{{ msg }}</p>

    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <h2>Login</h2>
     <div v-if="!loggedinUser"   class="login-warning">  you need to Login/Sign up first !      </div>
      <form @submit.prevent="doLogin">
        <select v-model="loginCred.username">
          <option value="">Select User</option>
          <option v-for="user in users" :key="user._id" :value="user.username">{{user.fullname}}</option>
        </select>
        <!-- <input type="text" v-model="loginCred.username" placeholder="User name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        /> -->
        <button>Login</button>
      </form>
      <p class="mute">user1 or admin, pass:123 </p>
      <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <button>Signup</button>
      </form>
    </div>
    <hr />
    <details>
      <summary>
        Admin Section
      </summary>
      <ul>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
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
    console.log('login user in login loguot ', this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    //this.loadUsers()
    
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password"
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
           this.userId = this.$store.getters.loggedinUser._id
           this.$router.push(`/user/${this.userId}`)
          // this.$router.push('/')
      } catch(err) {
          console.log(err)
          this.msg = "Failed to login"
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
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