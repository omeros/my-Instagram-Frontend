<template>
    <div class="signup-container-modal">
        <form @submit.prevent="doSignup" class="signup-form" id="parent-node">
            <div class="input-container">
                <label for="fullname" class="centerize-label"></label>
                <input   type="text" name="fullname" id="fullname" v-model="signupCred.fullname" placeholder="Full Name" class=" signup-input" />
                <label for="username" class="centerize-label"></label>
                <input type="text"  name="username" id="username" v-model="signupCred.username" placeholder="User Name"  class=" signup-input"  />
                <label for="password" class="centerize-label"></label>
                <input  type="password" name="password" id="password" v-model="signupCred.password" placeholder="Password" class=" signup-input"  />
            </div>
            <button class="signup-btn" >Sign Up Now</button>
        </form>
    </div>
</template>

<script>
export default {
name: "signup",
    data() {
    return {
        signupCred: {username: '', password: '', fullname: ''},
    };
},

methods:{
    doSignup(){
        this.$emit("signupCred",this.signupCred)
    }
}
}
</script>

<style>
</style>