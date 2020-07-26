import socket from '../services/socket-service.js'
import { msgService } from '../services/msg-service.js'

export default {
    state: {
        msgs: [],
        lastMsg: { from: { _id: '' } },
    },
    getters: {
        msgs(state) {
            return state.msgs;
        },
        lastMsg(state) {
            return state.lastMsg
        }
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs;
        },
        updateMsgs(state, { msg }) {
            state.msgs.push(msg)

        },
        setLastMsg(state, { msg }) {
            state.lastMsg = msg
        }
    },
    actions: {
        // sendMsg(context, { msg }) {
        //     socket.emit('sendMsg', msg)
        // },
        setupSocket(context) {
            socket.setup()
        },
        addMsg({ commit }, { msg }) {
            socket.on("chat addMsg", msg)

        },
        setupSocketName(context, { chatId }) {
            socket.emit('chat name', chatId)
        },
        showTyping(context, { isTyping }) {
            socket.on("chat showTyping", isTyping)
        },
        sendMsg({ commit }, { msg }) {
            socket.emit('chat newMsg', msg)
            commit({ type: 'setLastMsg', msg })

        },


        // getChatHistory(context, { chatId }) {
        //     socket.emit('getHistory', chatId)
        // },
        async loadMsgs(context, { stationId }) {
            const msgs = await msgService.query(stationId);
            context.commit({ type: 'setMsgs', msgs })
        },
    }
}