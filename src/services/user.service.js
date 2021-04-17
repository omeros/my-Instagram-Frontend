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


function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get(KEY, userId)
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    // return storageService.remove(KEY, userId)
    return httpService.delete(`user/${userId}`)
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
    // const users = await storageService.query(KEY)
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    //console.log('vvvvvvvvvvvvvvvv',userCred)
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    var newUser = getEmpthyUser();
    newUser.fullname = userCred.fullname
    newUser.username = userCred.username
    newUser.password = userCred.password

   // const user = await storageService.post(KEY, newUser)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    // sessionStorage.clear()
    return await httpService.post('auth/logout')
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

