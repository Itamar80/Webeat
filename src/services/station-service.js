import axios from 'axios'

export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation,
    setCurrSong,
    toggleLike
}

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/station' : '//localhost:3000/api/station';

function _getURL(id = '') {
    return `${BASE_URL}/${id}`
}

function query(filterBy) {
    const filterStr = `?name_like=${filterBy.name}`;
    return axios.get(`${_getURL()}${filterStr}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
}

async function getById(id) {
    const station = await axios.get(`${_getURL(id)}`)
    return station.data
}

async function toggleLike(id, loggedInUser, isLiked) {
    const station = await getById(id);
    console.log('start ', station.likedByUsers)
    if (isLiked) {
        (loggedInUser) ? station.likedByUsers.push(loggedInUser): station.likedByUsers.push({ username: 'Guest' })
        save(station)
        console.log('added: ', station.likedByUsers)
    } else {
        if (loggedInUser) {
            var idx = station.likedByUsers.findIndex((user) => user._id === loggedInUser._id)
            station.likedByUsers.splice(idx, 1)
            save(station)
        } else {
            console.log('before: ', station.likedByUsers)
            var idx = station.likedByUsers.findIndex((user) => user.username === 'Guest')
            station.likedByUsers.splice(idx, 1)
            save(station)
        }

    }

}

function remove(id) {
    return axios.delete(`${_getURL(id)}`)
}

function save(station) {
    return (station._id) ? _update(station) : _add(station)
}

function getEmptyStation() {
    return {
        name: '',
        imgUrl: '',
        tags: [],
        createdAt: Date.now(),
        createdBy: {},
        likedByUsers: [],
        songs: []

    }
}

function _update(station) {
    return axios.put(`${_getURL(station._id)}`, station)
        .then(res => res.data)
}

function _add(station) {
    return axios.post(`${_getURL()}`, station)
        .then(res => res.data)
}

function setCurrSong(song) {
    return song
}