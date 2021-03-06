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
            latin: 0,
            jazz: 0,
            rock: 0,
            pop: 0,
            classical: 0,
            alternative: 0,
            disco: 0,
            folk: 0,
            soul: 0,
            blues: 0,
            metal: 0,
        },
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
                    commit({ type: 'setStations', stations })
                    return stations
                })
        },
        saveStation({ commit }, { station }) {
            const type = (station._id) ? 'updateStation' : 'addStation'
            return stationService.save(station)
                .then((savedStation) => {
                    commit({ type, savedStation })
                    return savedStation
                })
        },
        searchSong({ commit }, { songStr }) {
            return songService.searchSong(songStr)
                .then(songList => {
                    commit({ type: 'setSongList', songList })
                })


        },
        async getCurrStation({ commit }, { id }) {
            // console.log(id);
            // console.log('staion iss', station);
            var station = await stationService.getById(id)
            commit({ type: 'setCurrStation', station })
        },

        async setCurrSong({ commit }, { song }) {
            commit({ type: 'setCurrSong', song })
            return song


        },
        async toggleLike({ commit }, { id, isLiked, loggedInUser }) {
            const station = await stationService.getById(id);
            if (isLiked) {
                (loggedInUser) ? station.likedByUsers.push(loggedInUser): station.likedByUsers.push({ _id: stationService._makeId(), username: 'Guest' })
                commit({ type: 'updateStation', savedStation: station })
            } else {
                if (loggedInUser) {
                    var idx = station.likedByUsers.findIndex((user) => user._id === loggedInUser._id)
                    station.likedByUsers.splice(idx, 1)
                    commit({ type: 'updateStation', savedStation: station })
                } else {
                    var idx = station.likedByUsers.findIndex((user) => user.username === 'Guest')
                    station.likedByUsers.splice(idx, 1)
                    commit({ type: 'updateStation', savedStation: station })
                }

            }
            stationService.save(station)
        }

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