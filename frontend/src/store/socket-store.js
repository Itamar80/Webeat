import socket from '../services/socket-service.js'
import { msgService } from '../services/msg-service.js'

export default {
    state: {
        msgs: [],
    },
    getters: {
        msgs(state) {
            return state.msgs;
        },
    },
    mutations: {
        setMsgs(state, { msgs }) {
            state.msgs = msgs;
        },
        updateMsgs(state, { msg }) {
            state.msgs.push(msg)

        }
    },
    actions: {
        sendMsg(context, { msg }) {
            socket.emit('sendMsg', msg)
        },
        setupSocket(context) {
            socket.setup()
        },
        addMsg(context, { msg }) {
            socket.on("chat addMsg", msg)

        },
        setupSocketName(context, { chatId }) {
            socket.emit('chat name', chatId)
        },
        showTyping(context, { isTyping }) {
            socket.on("chat showTyping", isTyping)
        },
        sendMsg(context, { msg }) {
            socket.emit('chat newMsg', msg)
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