import Vue from 'vue'
import Vuex from 'vuex'
import stationStore from './stations.store.js'
import userStore from './user.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        userStore,
        stationStore
    }

})