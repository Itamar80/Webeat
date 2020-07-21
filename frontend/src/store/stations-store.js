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
        songList: {},
        currSong: {},
        currStation: {},
        isPlaying: true,
        genresMap: {
            hiphop: 0,
            arabic: 0,
            easy: 0,
            electronic: 0,
            country: 0,
            flamenco: 0,
            jazz: 0,
            rock: 0,
            pop: 0,
        }
    },
    getters: {
        genresMap(state) {
            return JSON.parse(JSON.stringify(state.genresMap))
        },
        stations(state) {
            return state.stations
        },
        songList(state) {
            return state.songList
        },
        currSong(state) {
            return state.currSong
        },
        currStation(state) {
            return state.currStation
        },
        popularStations(state) {
            let copyStations = JSON.parse(JSON.stringify(state.stations))
            let sortedStationByLikes = copyStations.sort(function(stationA, stationB) {
                return stationA.likedByUsers.length - stationB.likedByUsers.length
            })
            sortedStationByLikes.reverse()
            return sortedStationByLikes.slice(0, 3)
        },
        isPlaying(state) {
            return state.isPlaying
        }

    },
    mutations: {
        updateGenresMap(state, { genre }) {
            state.genresMap[genre]++
        },
        setStations(state, { stations }) {
            state.stations = stations;
            state.stations.forEach(station => {
                if (station.genre) {
                    state.genresMap[station.genre]++
                }
            })
            console.log(state.genresMap);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        updateStation(state, { savedStation }) {
            let stationIdx = state.stations.findIndex(station => {
                return station._id === savedStation._id
            })
            state.stations.splice(stationIdx, 1, savedStation)
        },
        addStation(state, savedStation) {
            state.stations.unshift(savedStation)
        },
        setSongList(state, { songList }) {
            state.songList = songList
        },
        clearSongList(state) {
            state.songList = []
        },
        setCurrSong(state, { currSong }) {
            console.log('mutations currSong', currSong)
            state.currSong = currSong;
        },
        setCurrStation(state, { currStationId }) {
            state.currStation = state.stations.find(station => station._id === currStationId)
        },
        setSongStatus(state, { isPlaying }) {
            state.isPlaying = isPlaying
        }
    },
    actions: {
        loadStations({ commit, state }, { genre }) {
            return stationService.query(state.filterBy, genre)
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