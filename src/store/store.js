import Vue from 'vue'
import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { socketStore } from './socket.store.js'
import { reviewStore } from './review.store.js'
import { storyService } from "../services/story.service.js";

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    stories: null,
    filter: null,
    lastPath: null,
    editChanges: null,
  },
  getters: {
    getStories(state) {
      return state.stories
    },
  //   getToysToShow(state) {
  //     console.log('gettoysToShow',state)
  //     if (!state.filterBy) return state.toys
  //     const searchStr = state.filterBy.toLowerCase()
  //     const toysToShow = state.toys.filter(toy => {
  //         return toy.name.toLowerCase().includes(searchStr)
  //     })
  //     return toysToShow
  // },
  },
  mutations: {
    setStories(state, { stories }) {
      state.stories = stories;
    },
  },
  actions: {
    
    loadStories({ commit, state }) {
      storyService.query(state.filter || undefined)
      .then(stories => {
        console.log('in store - load stories from local storage',stories)
        commit({ type: 'setStories', stories });
      })
      .catch(err => {
        console.log('Store: Cannot load stories', err);
        throw new Error('Cannot load stories');
      })
    },
  },
  modules: {
    userStore,
    socketStore,
    reviewStore
  },
})
