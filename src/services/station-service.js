import axios from 'axios'

export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation
}

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/station' : '//localhost:3000/station';

function _getURL(id = '') {
    return `${BASE_URL}/${id}`
}

function query(filterBy) {
    return axios.get(`${_getURL()}`)
        .then(res => res.data)
}

async function getById(id) {
    // const station = await axios.get(`${_getURL(id)}`)
    // console.log(station.data);
    // return station.data
    return axios.get(`${_getURL(id)}`)
        .then(res => res.data)
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
        price: null,
        type: null,
        createdAt: Date.now(),
        inStock: null,
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