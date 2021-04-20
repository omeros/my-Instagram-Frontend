import { utilService } from "./util.service.js";
// import axios from 'axios'
import { storageService } from "./async-storage.service.js";
import {httpService} from './http.service'



const gStories = require('../data/story.json');
const KEY = 'storyDB';
const gSmiles = require('../data/smiley.json');




export const storyService = {
  query,
  getById,
  remove,
  save,
  getEmptystory,
  getSmiles,
  querySmiley

}

function query(filterBy) {
   var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
   return  httpService.get(`story${queryStr}`)



  // if (!filterBy){
  //   const stories =  storageService.query(KEY);
  //   console.log(' on story service,',stories)
  //   if (!stories || !stories.length ){
  //     console.log(' on story service,',stories)
  //     localStorage.setItem(KEY, JSON.stringify(gStories))
  //     return storageService.query(KEY);
  //   }else{
  //     return stories
  //   }
  // }else{
  //     const tempStories =  storageService.query(KEY);
  //     if (!tempStories || undefined  ){
  //         const stories = gStories.filter(story => {
  //         return (story.tags.includes(filterBy.name) && (filterBy.rating === story.rating) 
  //         ) 
  //     })
  //    return stories
  //   }else{
  //       const stories = tempStories.filter(story => {
  //         return (story.tags.includes(filterBy.name) && (filterBy.rating === story.rating) 
  //       ) 
  //     })
  //     return stories
  //   }
  // }

 

}

function getById(id) {
  // return storageService.get(KEY, id)
  return  httpService.get(`story/${id}`)

}

function remove(id) {
 //return storageService.remove(KEY, id)
  return httpService.delete(`story/${id}`)
}

function save(story) {
  console.log(' before sent to DB',story)
  if (story._id) {
 //   console.log('update story at  strory.sevice')
    return  httpService.put(`story/${story._id}`,story)             // update a story
} else {
    console.log('add new story at story.service', story)
    return httpService.post(`story/`,story)                     // addad a  new story
}

  return savedStory;
}

function getEmptystory(){
  return {
    txt: '',
    imgUrl: '',
    createdAt: '',
    by : {
      _id: '',
      fullname: "",
      imgUrl: ""
    },
    loc: {
      lat: null,
      lng: null,
      name: ""
    },
    comments: [

    ],
    likedBy: [
      {
        _id:  utilService.makeId,
        fullname: "",
        imgUrl: ""
      },
      {
        _id:  utilService.makeId,
        fullname: "",
        imgUrl:""
      }
    ],
    tags: ["", ""]
  }

}

function querySmiley(){
  return  httpService.get(`smiley`)
}


function getSmiles(){
  return querySmiley()
}
// function getSmiles(){
//   gSmiles.forEach(smile=>{
//    smile._idx = utilService.makeId()
//   })
//   return gSmiles
// }
