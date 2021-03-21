import { utilService } from "./util.service.js";
// import axios from 'axios'
import { storageService } from "./async-storage.service.js";
const gStories = require('../data/story.json');
const KEY = 'storyDB';

// const GIG_URL = 'http://localhost:3030/api/gig/'
// _createToys();

export const storyService = {
  query,
  getById,
  remove,
  save,
  getEmpthystory
}

function query(filterBy) {
  if (!filterBy) localStorage.setItem(KEY, JSON.stringify(gStories))
  else {
    const stories = gStories.filter(story => {
      // return (story.tags.includes(filterBy.name) || ((story.tags.includes(filterBy.name)) && (story.price >= filterBy.price.minPrice && story.price <= filterBy.price.maxPrice) &&
      //   (filterBy.rating === story.rating) && (filterBy.level === story.creator.level))
      return (story.tags.includes(filterBy.name) && (filterBy.rating === story.rating) 
      ) 
    })
    localStorage.setItem(KEY, JSON.stringify(stories))
  }
  return storageService.query(KEY);
}

function getById(id) {
  // return axios.get(TOY_URL + id)
  //   .then(res => {
  //     return res.data
  //   })
  return storageService.get(KEY, id)
}

function remove(id) {
  // return axios.delete(TOY_URL + id)
  //   .then(res => res.data)
  return storageService.remove(KEY, id)
}

function save(story) {
  // if (story._id) {
  //   return axios.put(story_URL + story._id, story)
  //     .then(res => res.data)
  // } else {
  //   return axios.post(story_URL, story)
  //     .then(res => res.data)
  // }
//  console.log('story srvice', story);
  const savedGig = (story._id) ? storageService.put(KEY, story) : storageService.post(KEY, story)

  return savedGig;
}

function getEmpthystory(){



  return {
    txt: '',
    imgUrl: '',
    createdAt: '',
    by : {
      _id: utilService.makeId ,
      fullname: "",
      imgUrl: ""
    },
    loc: {
      lat: null,
      lng: null,
      name: ""
    },
    comments: [
      {
        id:  utilService.makeId,
        by: {
          _id: "",
          fullname: "Bob",
          imgUrl: ""
        },
        txt: "",
        likedBy: [ 
          {
            _id:  utilService.makeId,
            fullname: "",
            imgUrl: ""
          }
        ]
      },
      {
        id:  utilService.makeId,
        by: {
          _id:  utilService.makeId,
          fullname: "",
          imgUrl: ""
        },
        txt: ""
      }
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



// Create Test toys Data:
// function _createToys() {
//   var toys = JSON.parse(localStorage.getItem(KEY))
//   if (!toys || !toys.length) {
//     const TOY_URL = 'http://www.filltext.com/?rows=20&_id=%7bindex%7d&name=%7blorem|2%7d&price=%7bnumber|100%7d&type=%5b%22Educational%22,%22Funny%22,%22Adult%22%5d&createdAt=%7bdate|1970,2000%7d&inStock=%7bbool%7d&pretty=true'
//     return axios.get(TOY_URL)
//       .then(res => {
//         toys = res.data
//         localStorage.setItem(KEY, JSON.stringify(toys))
//       })
//   }
//   return toys;
// }
