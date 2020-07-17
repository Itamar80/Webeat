import axios from 'axios'

export const songService = {
    searchSong
}

function searchSong(songToSrc) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?videoCategoryId=10&part=id,snippet&maxResults=10&type=video&q=${songToSrc}&key=AIzaSyBKvy49NTuV-CuMFM-VWCC-jEkpPH4IezE`)
        .then(res => res.data)
}