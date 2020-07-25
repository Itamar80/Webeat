import axios from 'axios'

export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation,
    // setCurrSong,
    toggleLike
}

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/station' : '//localhost:3000/api/station';

function _getURL(id = '') {
    return `${BASE_URL}/${id}`
}

function query(filterBy, genre) {
    // ${filterStr}&
    const filterStr = `?name_like=${filterBy.name}`;
    if (!genre) genre = ''
    const filterGenre = `genre_like=${genre}`;
    return axios.get(`${_getURL()}${filterStr}&${filterGenre}`)
        .then(res => {
            return res.data
        })
}

async function getById(id) {
    const station = await axios.get(`${_getURL(id)}`)
    return station.data
}
//make sessionStorage for guest and update the like in the station per user.
async function toggleLike(id, loggedInUser, isLiked) {
    const station = await getById(id);
    console.log('start ', station.likedByUsers, isLiked)
    if (isLiked) {
        (loggedInUser) ? station.likedByUsers.push(loggedInUser): station.likedByUsers.push({ _id: _makeId(), username: 'Guest' })
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

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
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
    console.log('update')
    return axios.put(`${_getURL(station._id)}`, station)
        .then(res => {
            console.log(res.data)
            return res.data
        })
}

function _add(station) {
    console.log('add')
    return axios.post(`${_getURL()}`, station)
        .then(res => res.data)
}

// function setCurrSong(song) {
//     return song
// }