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
        currSong: {}
    },
    getters: {
        stations(state) {
            return state.stations
        },
        currSong(state) {
            console.log('getters', state.currSong)
            return state.currSong
        }

    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        updateStation(state, { savedStation }) {
            let stationIdx = state.stations.findIndex(station => {
                return station._id === savedStation._id
            })
            state.stations.splice(stationIdx, 1, savedStation)
            console.log(state.stations);
        },
        addStation(state, savedStation) {
            state.stations.unshift(savedStation)
            console.log(state.stations);
        },
        setCurrSong(state, { currSong }) {
            console.log('mutations', currSong)
            state.currSong = currSong;
        }
    },
    actions: {
        loadStations({ commit, state }) {
            return stationService.query(state.filterBy)
                .then(stations => {
                    commit({ type: 'setStations', stations })
                    return stations
                })
        },
        saveStation({ commit }, { station }) {
            const type = (station._id) ? 'updateStation' : 'addStation'
            return stationService.save(station)
                .then((savedStation) => {
                    commit({ type, station: savedStation })
                })
        },
        async setCurrSong({ commit }, { song }) {
            const currSong = stationService.setCurrSong(song);
            commit({ type: 'setCurrSong', currSong })
            return currSong


        }
        // removeStation({commit}, {id}){
        //     return stationService.remove(id)
        //         .then(()=>{
        //             commit({type: 'removeStation', id})
        //         })
        // },
    },
}