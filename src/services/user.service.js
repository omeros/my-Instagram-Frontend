import { storageService } from './async-storage.service'
import { utilService } from "./util.service.js";
import { httpService } from './http.service'


const gUsers = require('../data/user.json');
const KEY = 'userDB';
const SCORE_FOR_REVIEW = 10


export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    increaseScore,
    getEmpthyUser
}

window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

// function getUsers() {
//     return storageService.query('user')
//     // return httpService.get(`user`)
// }

function getUsers(filterBy) {
    if (!filterBy) localStorage.setItem(KEY, JSON.stringify(gUsers))
    else {
      const users = gUsers.filter(user => {
        // return (story.tags.includes(filterBy.name) || ((story.tags.includes(filterBy.name)) && (story.price >= filterBy.price.minPrice && story.price <= filterBy.price.maxPrice) &&
        //   (filterBy.rating === story.rating) && (filterBy.level === story.creator.level))
        return (user.tags.includes(filterBy.name) && (filterBy.rating === user.rating) 
        ) 
      })
      localStorage.setItem(KEY, JSON.stringify(users))
    }
    return storageService.query(KEY);
  }

function getById(userId) {
    return storageService.get(KEY, userId)
    // return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return storageService.remove(KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    return storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser()
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function login(userCred) {
    const users = await storageService.query(KEY)
    const user = users.find(user => user.username === userCred.username)
    return _saveLocalUser(user)

    // const user = await httpService.post('auth/login', userCred)
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    var newUser = getEmpthyUser();
    newUser.fullname = userCred.fullname
    newUser.username = userCred.username
    newUser.password = userCred.password

    const user = await storageService.post(KEY, newUser)
    // const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
    // return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}


// if the program have an 'undefined' value for the user in sessionStorage, the program does not load
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function getEmpthyUser(){

    return   {

        fullname : "",
        username : "",
        password : "",
        imgUrl : "",
        createdAt :   new Date(),
        following : [
          {
            _id : "",
            fullname : "",
            imgUrl: ""
          }
        ],
        followers  : [
          {
            _id  : "",
             fullname : "",
            imgUrl  : ""
          }
        ],
        savedPostIds : ["", "", ""]
    }

}

