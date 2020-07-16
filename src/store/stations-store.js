import Vue from 'vue'
import Vuex from 'vuex'
import { stationService } from '../services/station-service.js'

Vue.use(Vuex)
export const stationStore = {
    strict: true,
    state: {
        stations: [],
        filterBy: {
            name: '',
        },
    },
    getters: {
        stations(state) {
            return state.stations
        },

    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
    },
    actions: {
        loadStations({ commit, state }) {
            return stationService.query(state.filterBy)
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