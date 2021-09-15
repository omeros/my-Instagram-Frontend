import Vue from 'vue'
import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { socketStore } from './socket.store.js'
import { reviewStore } from './review.store.js'
import { storyService } from "../services/story.service.js";
import { utilService } from '../services/util.service.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    stories: [],
    filterBy: null,
    lastPath: null,
    editChanges: null,
    isCommentLikedBefor: false,
    smilies: []
  },

  //********** getters ********************************************/
  getters: {
    //  isCommentLiked  : (state) => (details) =>
    // {
    //   var storyId= details.storyId
    //   var commentIdx = details.commentIdx
    //    var isLikedBefor = [false];
    //    var theUser =  userStore.state.loggedinUser
    //    isLikedBefor = story.comments[commentIdx].likedBy.filter(user => {
    //    if(user._id===userDetails._id){
    //     const isItTheUser = (element) => element._id===user._id;
    //       var idx = storyCommentToLike.comments[commentIdx].likedBy.findIndex(isItTheUser)
    //       console.log('the id to delete',idx)
    //       storyCommentToLike.comments[commentIdx].likedBy.splice(idx,1)
    //         console.log('yes baby')
    //       return true
    //      }
    //   })
    //   console.log('isLikedBefor',isLikedBefor)
    //    return isLikedBefor
    // },

    smiley(state) {
      return state.smilies
    },
    isCommentLikedBefor(state) {
      return state.isCommentLikedBefor
    },
    getStories(state) {
      return state.stories
    },
    getEmptyStory(state) {
      var emptyStory = storyService.getEmptystory()
      var theUser = userStore.state.loggedinUser
      emptyStory.by._id = theUser._id
      emptyStory.by.fullname = theUser.fullname
      emptyStory.by.imgUrl = theUser.imgUrl
      return emptyStory
    },
    storiesToShow(state) {
      if (!state.filterBy) return state.stories
      const searchStr = state.filterBy.toLowerCase()
      const storiesToShow = state.stories.filter(story => {
        return story.by.fullname.toLowerCase().includes(searchStr)
      })
      return storiesToShow
    },

    getStoryByUserId: (state) => (id) => {
      var storyToFind = []
     // console.log("stories for  user-details in store",  state.stories);
    //  console.log("id to find for  user-details in store",  id);
      state.stories.find(story => {
        if (story.by._id === id) {
          storyToFind.push(story);
        }
      })
      return storyToFind
    },
    getStoryById: (state) => (id) => {
      var storyToEdit = null
      state.stories.find(story => {
        if (story._id === id) {
          storyToEdit = story;
        }

      })
      return storyToEdit
    },
  },

  //********************************** Mutations *******************************************/
  mutations: {
    filterByChanged(state, payload) {
   //   console.log('filterByChanged is running', payload.strFilter.name)
      state.filterBy = payload.strFilter.name
    },
    setStories(state, { stories }) {
      state.stories = stories.reverse();
    },
    setSmilies(state, { smilies }) {
     // console.log('smilies setttttttttttttttttttttttt', smilies)
      state.smilies = smilies;
    },

    setStory(state, payload) {
      console.log('set new story on store : ', payload)
      const storyUpdated = JSON.parse(JSON.stringify(payload.updatedStory))
      state.stories.unshift(storyUpdated);
    },
    removeStory(state, payload) {
  //    console.log('story to remove in mutation store', payload)
      const idx = state.stories.findIndex(p => p._id === payload.storyToRemoveId)
      state.stories.splice(idx, 1,);
    },
    updateStories(state, payload) {
      //  console.log('payload.updatedStory in store',payload.updatedStory)
      const idx = state.stories.findIndex(p => p._id === payload.updatedStory._id)
      state.stories.splice(idx, 1, payload.updatedStory);
      console.log(' updateStories in store', state.stories)
    },
    commentLikedBefor(state, payload) {
      this.state.isCommentLikedBefor = true
    },
    commentNotLikedBefor(state, payload) {
      this.state.isCommentLikedBefor = true
    },

  },

  // ************************ Acitions  ***************************************//
  actions: {
    removeStory(context, { storyToRemoveId }) {
      //  console.log('story to remove in action store',payload.storyToRemoveId)
      storyService.remove(storyToRemoveId)
        .then(() => {
          context.commit({ type: 'removeStory', storyToRemoveId });
        })
    },
    addNewStory(context, payload) {
      //  console.log('payload in store',payload.newStory)
      storyService.save(payload.newStory)
        .then(updatedStory => {
          context.commit({ type: 'setStory', updatedStory });
        })
        .catch(err => {
          // console.log('Store: Cannot update like to comment in  stories', err);
          throw new Error('Cannot update like to comment in  stories');
        })
    },

    addLikeToComment(context, payload) {
      var storyId = payload.theDetails.storyId
      var commentIdx = payload.theDetails.commentIdx
      var theUser = userStore.state.loggedinUser
      var userDetails = {
        _id: theUser._id,
        fullname: theUser.fullname,
        imgUrl: theUser.imgUrl
      }
      storyService.getById(storyId)
        .then(storyCommentToLike => {
          var isLikedBefor = [false];
          isLikedBefor = storyCommentToLike.comments[commentIdx].likedBy.filter(user => {
            if (user._id === userDetails._id) {
              const isItTheUser = (element) => element._id === user._id;
              var idx = storyCommentToLike.comments[commentIdx].likedBy.findIndex(isItTheUser)
              storyCommentToLike.comments[commentIdx].likedBy.splice(idx, 1)
              return true
            }
          })
          if (isLikedBefor.length === 0) {      
            storyCommentToLike.comments[commentIdx].likedBy.push(userDetails)
          }
          storyService.save(storyCommentToLike)
            .then(updatedStory => {
              context.commit({ type: 'updateStories', updatedStory });
            })
        })
        .catch(err => {
          console.log('Store: Cannot update like to comment in  stories', err);
          throw new Error('Cannot update like to comment in  stories');
        })
    },

    removeLikeFromStory(context, payload) {
      var storyId = payload.storyId
      var theloggedInUser = userStore.state.loggedinUser
      storyService.getById(storyId)
        .then(storyRemoveLike => {
          const idx = storyRemoveLike.likedBy.findIndex(user => user._id === theloggedInUser._id)
          storyRemoveLike.likedBy.splice(idx, 1);
          storyService.save(storyRemoveLike)
            .then(updatedStory => {
              context.commit({ type: 'updateStories', updatedStory });
            })
        })
        .catch(err => {
          console.log('Store: Cannot remove liket in  stories', err);
          throw new Error('Cannot remove like in  stories');
        })
    },
    setLikeToStory(context, payload) {
      console.log('setLikeToStory in store');
      var storyId = payload.storyId
      var theUser = userStore.state.loggedinUser

      storyService.getById(storyId)
        .then(storyToLike => {
          var userDetails = {
            _id: theUser._id,
            fullname: theUser.fullname,
            imgUrl: theUser.imgUrl
          }
          const isLikedBefor = storyToLike.likedBy.some(user => {
            return (userDetails._id === user._id)
          })
          if (!isLikedBefor) {
            storyToLike.likedBy.push(userDetails)
          } else {
            const idx = storyToLike.likedBy.findIndex(user => user._id === userDetails._id)
            storyToLike.likedBy.splice(idx, 1);
          }
          // storyToLike.likedBy.push(userDetails)
          storyService.save(storyToLike)
            .then(updatedStory => {
              //   console.log('Store:updatedStory after like  from DB',updatedStory)
              context.commit({ type: 'updateStories', updatedStory });
            })
        })
        .catch(err => {
          console.log('Store: Cannot update like in  stories', err);
          throw new Error('Cannot update like in  stories');
        })
    },
    addCommentToStory(context, payload) {                  //<================================
      //console.log('add comment in store :',  payload.comment.txt)
      var storyId = payload.comment.storyId
      var commentTxt = payload.comment.txt
      var theUser = userStore.state.loggedinUser
      storyService.getById(storyId)
        .then(storyToComment => {
          const _commentToAdd =
          {
            id: utilService.makeId(),
            by: {
              _id: theUser._id,
              fullname: theUser.fullname,
              imgUrl: theUser.imgUrl,
            },
            txt: commentTxt,
            likedBy: []
          }
          const commentToAdd = JSON.parse(JSON.stringify(_commentToAdd))
          storyToComment.comments.push(commentToAdd)
          //  console.log('add comment in store  before save:',  storyToComment)
          storyService.save(storyToComment)
            .then(updatedStory => {
              console.log('add comment in store :', updatedStory)
              context.commit({ type: 'updateStories', updatedStory });
            })
        })
        .catch(err => {
          console.log('Store: Cannot update comment in  stories', err);
          throw new Error('Cannot update comment in  stories');
        })
    },
    loadStories({ commit, state }) {                          
      storyService.query(state.filter || undefined)
        .then(stories => {
          storyService.querySmiley()
            .then(smilies => {
              commit({ type: 'setSmilies', smilies });
            })
          //console.log('in store - load stories from DB storage', stories)
          commit({ type: 'setStories', stories });
        })
        .catch(err => {
          //     console.log('Store: Cannot load stories', err);
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
