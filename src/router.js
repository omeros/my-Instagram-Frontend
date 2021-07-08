import Vue from 'vue'
import Router from 'vue-router'
import loginSignup from './views/login-signup.vue'
import storyApp from './views/story-app.vue'
import userDetails from './views/user-details.vue'
// import userFilter from "@/cmps/user-filter.vue";
// import userApp from './views/user-app.vue'


Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'loginSignup',
      component: loginSignup
    },
    {
      path: '/',
      name: 'storyApp',
      component: storyApp,
    },

    {
      path: '/user/:id',
      name: 'user-details',
      component: userDetails
    }
  ]
})
