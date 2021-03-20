import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import chat from './views/chat.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import storyApp from './views/story-app.vue'
import userDetails from './views/user-details.vue'
// import userApp from './views/user-app.vue'


Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'storyApp',
      component: storyApp
    },
    {
      path: '/review',
      name: 'review',
      component: reviewApp
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/login',
      name: 'loginSignup',
      component: loginSignup
    },
    // {
    //   path: '/users',
    //   name: 'users',
    //   component: userApp
    // },
    {
      path: '/user/:id',
      name: 'user-details',
      component: userDetails
    }
  ]
})
