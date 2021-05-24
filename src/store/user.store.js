import { userService } from '../services/user.service'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const userStore = {
    state: {
        loggedinUser:  userService.getLoggedinUser() ||  null,
        users: [],
        loggedinUsers: [],

    },
    getters: {
        users({ users }) { return users },
        loggedinUsers({ loggedinUsers }) {
            return loggedinUsers
        },
        loggedinUser({ loggedinUser }) {
           // console.log('loggedinUser in user store', loggedinUser)
            return loggedinUser
        },


        getUserById: (state) => (id) => {
            var userToFind = null
            state.users.find(user => {
                if (user._id === id) {
                    userToFind = user;
                }

            })
            return userToFind
        },
        // getUsersToShow(state) {
        //     console.log('getusersToShow',state)
        //     if (!state.filterBy) return state.users
        //     const searchStr = state.filterBy.toLowerCase()
        //     const usersToShow = state.users.filter(user => {
        //         return user.username.toLowerCase().includes(searchStr)
        //     })
        //     return usersToShow
        // },


        watchedUser({ watchedUser }) { return watchedUser }
    },
    mutations: {
        // filterByChanged(state,payload){
        //     console.log('filterByChanged is running',payload.strFilter.name)
        //     state.filterBy = payload.strFilter.name
            
        // },
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user;
            const objUser = JSON.parse(JSON.stringify(user))
            state.loggedinUsers.push(objUser);
        },
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user;
        },
        setWatchedUser(state, { user }) {
            state.watchedUser = user;
        },
        setUsers(state, { users }) {
        //    console.log('in user store  setUsers - load users from local storage', users)
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred);
                console.log(' user log in m in user store,  ')
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit, state }) {
            try {
                const users = await userService.getUsers(state.filter || undefined);
                console.log('in user store - load users from local storage', users)
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId);
                commit({ type: 'setWatchedUser', user })
                socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
                socketService.off(SOCKET_EVENT_USER_UPDATED)
                socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                    commit({ type: 'setWatchedUser', user })
                })
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId);
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user);
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        }
    }
}