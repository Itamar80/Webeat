import axios from 'axios'

export const songService = {
    searchSong,
    makeId
}

function searchSong(songToSrc) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?videoCategoryId=10&part=id,snippet&maxResults=10&type=video&q=${songToSrc}&key=AIzaSyCL_yhWrhjnGwWzeYW6gImnzcOtecv12qQ`)
        // return axios.get(`https://www.googleapis.com/youtube/v3/search?videoCategoryId=10&part=id,snippet&maxResults=10&type=video&q=${songToSrc}&key=AIzaSyDVuDF5cQXoUP8rx5HNygC4oJ0WHxTnYeQ`)
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