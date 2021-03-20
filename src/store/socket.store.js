import {socketService} from '../services/socket.service.js'

export const socketStore = {
    state: {
    },
    getters: {
    },
    mutations: {
        setJob(state, {job}) {
            state.job = job;
        }
    },
    actions: {
        // TODO: show on
        sendMsg(context, {msg}) {
            socketService.emit('sendMsg', msg)
        },
        getChatHistory(context, {chatId}) {
            socketService.emit('getHistory', chatId)
        }
    }
}