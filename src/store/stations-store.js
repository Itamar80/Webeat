import Vue from 'vue'
import Vuex from 'vuex'
import { stationService } from '../services/station-service.js'

Vue.use(Vuex)
export const stationStore = {
    strict: true,
    state: {
        stations: []
    },
    getters: {
        stations(state) {
            console.log(state.stations);
            return state.stations
        },

    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
    },
    actions: {
        loadStations({ commit, state }) {
            return stationService.query()
                .then(stations => {
                    commit({ type: 'setStations', stations })
                    return stations
                })
        },
        // saveStation({commit}, {station}) {
        //     const type = (station._id)? 'updateStation' : 'addStation'
        //     return stationService.save(station)
        //         .then((savedStation)=>{
        //             commit({type ,station: savedStation})
        //         })
        // },
        // removeStation({commit}, {id}){
        //     return stationService.remove(id)
        //         .then(()=>{
        //             commit({type: 'removeStation', id})
        //         })
        // },
    },
}