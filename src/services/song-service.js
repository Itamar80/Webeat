import axios from 'axios'

export const songService = {
    searchSong
}

function searchSong(songToSrc) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=10&type=video&q=${songToSrc}&key=AIzaSyB1wyCUtwhht7x4IVNXeK-bxgCtaKSbsvg`)
        .then(res => res.data)
}