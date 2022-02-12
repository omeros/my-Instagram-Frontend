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
    getLoggedinUsers,
    increaseScore,
    getEmpthyUser,
    saveLocalUsers,
    saveChatMessages,
    getChatMessages,
    saveAllUsers,
    getAllUsers
}

window.userService = userService


function getUsers() {
    return httpService.get(`user`)
    // return storageService.query('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
    //**** only Front : **/
    // return storageService.get(KEY, userId)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
    //**** only Front : **/
    // return storageService.remove(KEY, userId)
}

async function update(user) {
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    console.log('updatedUser on function update :',updatedUser)
    return  _saveLocalUser(updatedUser)
    //**** only Front : **/
   // return storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    //  if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser()
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)

    //**** only Front : **/
    // const users = await storageService.query(KEY)
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)
   // _saveLocalUsers(user)
}
async function signup(userCred) {
    const newUser = getEmpthyUser();
    newUser.fullname = userCred.fullname
    newUser.username = userCred.username
    newUser.password = userCred.password
    const user = await httpService.post('auth/signup', newUser)
    return _saveLocalUser(user)
     // const user = await storageService.post(KEY, newUser)
    //_saveLocalUsers(user)
}
async function logout() {
    return await httpService.post('auth/logout')
    // sessionStorage.clear()
}
function saveChatMessages(msg){
    const allMessages =  JSON.parse(localStorage.getItem('chatMessages') || 'null')
    console.log('allMessages in user service',allMessages)
    if(allMessages){
        console.log('yes')
        console.log('msg in user service',msg)
        allMessages.push(msg)
        localStorage.setItem('chatMessages', JSON.stringify(allMessages))
        console.log('allMessages after push in user service',allMessages)
        return allMessages
    }else{
        console.log('no')
        const messages=[]
        messages.push(msg)
        localStorage.setItem('chatMessages', JSON.stringify(messages))
        return messages
    }
}
function getChatMessages(){
    return JSON.parse(localStorage.getItem('chatMessages'))
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function saveAllUsers(allUsers) {
    sessionStorage.setItem('allLogedInUsers', JSON.stringify(allUsers))
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    // const allUsers = JSON.parse(sessionStorage.getItem('loggedinUsers') || 'null')
    // if(allUsers){
    // }
}

function getAllUsers(){
    return  JSON.parse(sessionStorage.getItem('allLogedInUsers') || 'null')
}

function saveLocalUsers(user) {
    const allUsers = JSON.parse(sessionStorage.getItem('loggedinUsers') || 'null')
    if(allUsers){
        const check = allUsers.some((value) => value._id === user._id) 
        if(!check){
            allUsers.push(user)
        }
        sessionStorage.setItem('loggedinUsers', JSON.stringify(allUsers))
        return allUsers
    }else{
        const loginusers=[]
        loginusers.push(user)
        sessionStorage.setItem('loggedinUsers', JSON.stringify(loginusers))
        return loginusers
    }
    // const filteredUsers = allUsers.filter((value,index) => allUsers.findIndex((val)=> {
    //   val._id  === value._id   }) === index
    // )
}
function getLoggedinUsers(){
    return  JSON.parse(sessionStorage.getItem('loggedinUsers') || 'null')
}


// if the program have an 'undefined' value for the user in sessionStorage, the program does not load
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function getGuest(){
    return  {
            "_id" : "70981b985a3a1a1820e6bb4b",
            "username": "🎀 Guest 🎀",
            "password": "$2b$10$P2ha9WUeOn1jH.jQo/EvbOMBNipzSUSE25c/ramUHhJfo4dCdyjom",
            "fullname": "Guest ",
            "bio" : "Public Figure",
            "imgUrl": "https://res.cloudinary.com/omerphoto/image/upload/v1620580104/Instagram/user11_fihlnd.jpg",
            "createdAt": 123543452,
            "following": [ 
            ],
            "followers": [
            ],
            "savedPostIds": []
    }

}

function getEmpthyUser(){
    return   {
        fullname : "",
        username : "",
        password : "",
        imgUrl : "",
        bio : "",
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

