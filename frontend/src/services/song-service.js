import axios from 'axios'
import { key } from './api-key.js'

export const songService = {
    searchSong,
    makeId
}

function searchSong(songToSrc) {
    // return axios.get(`https://www.googleapis.com/youtube/v3/search?videoCategoryId=10&part=id,snippet&maxResults=10&type=video&q=${songToSrc}&key=AIzaSyDVuDF5cQXoUP8rx5HNygC4oJ0WHxTnYeQ`)
    return axios.get(`https://www.googleapis.com/youtube/v3/search?videoCategoryId=10&part=id,snippet&maxResults=10&type=video&q=${songToSrc}&key=${key}`)
        .then(res => res.data)
}

function makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}