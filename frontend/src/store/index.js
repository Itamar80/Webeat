import Vue from 'vue'
import Vuex from 'vuex'
import { stationStore } from './stations-store.js'
import { userStore } from './user-store.js'
import socketStore from './socket-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        userStore,
        stationStore,
        socketStore
    }

})