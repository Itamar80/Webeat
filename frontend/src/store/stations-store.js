import Vue from 'vue'
import Vuex from 'vuex'
import { stationService } from '../services/station-service.js'
import { songService } from '../services/song-service.js'
import { storageService } from '../services/storage.service.js'
import socket from '../services/socket-service.js'

Vue.use(Vuex)
export const stationStore = {
    strict: true,
    state: {
        stations: [],
        filterBy: {
            name: '',
        },
        songList: {},
        currSong: null,
        currStation: null,
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
        },
    },
    getters: {
        genresMap(state) {
            return JSON.parse(JSON.stringify(state.genresMap))
        },
        stations(state) {
            console.log('getter', state.stations)
            return state.stations
        },
        songList(state) {
            return state.songList
        },
        currSong(state) {
            let currSong = state.currSong
            if (currSong) return currSong;
            else if (storageService.loadFromSession("currSong"))
                return storageService.loadFromSession("currSong");
            else return {}

        },
        currStation(state) {
            if (state.currStation) return state.currStation
            return storageService.loadFromSession('currStation')
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
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        updateStation(state, { savedStation }) {
            console.log('store ststion:', savedStation)
            console.log('saved station: ', savedStation._id)
            let stationIdx = state.stations.findIndex(station => {
                console.log('station: ', station._id)
                return station._id === savedStation._id
            })
            console.log(stationIdx)
            console.log(state.stations)
            state.stations.splice(stationIdx, 1, savedStation)
        },
        addStation(state, savedStation) {
            state.stations.unshift(savedStation)
        },
        setSongList(state, { songList }) {
            console.log("SET SONGLIST", songList)
            state.songList = songList
        },
        clearSongList(state) {
            state.songList = {}
        },
        setCurrSong(state, { song }) {
            state.currSong = song;
            storageService.storeToSession('currSong', song)
        },
        setCurrStation(state, { station }) {
            state.currStation = station
            storageService.storeToSession('currStation', station)
        },
        setSongStatus(state, { isPlaying }) {
            state.isPlaying = isPlaying
        },
    },
    actions: {
        loadStations({ commit, state }, { genre }) {
            return stationService.query(state.filterBy, genre)
                .then(stations => {
                    // console.log(stations)
                    commit({ type: 'setStations', stations })
                    return stations
                })
        },
        saveStation({ commit }, { station }) {
            const type = (station._id) ? 'updateStation' : 'addStation'
            return stationService.save(station)
                .then((savedStation) => {
                    commit({ type, savedStation })
                })
        },
        searchSong({ commit }, { songStr }) {
            // console.log('in store', songStr);
            return songService.searchSong(songStr)
                .then(songList => {
                    commit({ type: 'setSongList', songList })
                    console.log("store commit: ", songList)
                })


        },
        async getCurrStation({ commit }, { id }) {
            var station = await stationService.getById(id)
            commit({ type: 'setCurrStation', station })
        },

        async setCurrSong({ commit }, { song }) {
            commit({ type: 'setCurrSong', song })
            return song


        },

        // listenToSongChange() {
        //     socket.on('song changed', song)
        // }
        // removeStation({commit}, {id}){
        //     return stationService.remove(id)
        //         .then(()=>{
        //             commit({type: 'removeStation', id})
        //         })
        // },
    },
}