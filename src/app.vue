<template>
  <div id="app" >
    <div id="nav">
       <app-header />
       <router-view />
       <app-footer />
    </div>
  </div>
</template>



<script>
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";

export default {
    name: "App",

        data() {
    return {

  
    }
  },

  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadStories" });
    this.$store.dispatch({ type: "loadUsers" });
 
  },

  components: {
    appHeader,
    appFooter,
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
