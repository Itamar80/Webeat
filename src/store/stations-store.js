import Vue from 'vue'
import Vuex from 'vuex'
import { stationService } from '../services/station-service.js'
import { songService } from '../services/song-service.js'

Vue.use(Vuex)
export const stationStore = {
    strict: true,
    state: {
        stations: [],
        filterBy: {
            name: '',
        },
        songList: null
    },
    getters: {
        stations(state) {
            return state.stations
        },
        songList(state) {
            return state.songList
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
        setSongList(state, { songList }) {
            state.songList = songList
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
        searchSong({ commit }, { songStr }) {
            // console.log('in store', songStr);
            return songService.searchSong(songStr)
                .then(songList => {
                    commit({ type: 'setSongList', songList: songList })
                })


        }

        // removeStation({commit}, {id}){
        //     return stationService.remove(id)
        //         .then(()=>{
        //             commit({type: 'removeStation', id})
        //         })
        // },
    },
}