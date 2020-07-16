<template>
  <div class="station-details flex row">
    <song-list :songs="station.songs"/>
    <curr-song/>
    <chat-app/>
    <pre>{{station}}</pre>
  </div>
</template>

<script>
import {stationService} from '../services/station-service.js'
import chatApp from '../components/chat-app.vue'
import currSong from '../components/curr-song.vue'
import songList from '../components/song-list.vue'
export default {
  data(){
    return{
      station: null
    }
  },
  created(){
   let id = this.$route.params.id;
   this.getStation(id)
  },
  methods:{
    async getStation(id){
      let station = await stationService.getById(id)
      this.station = station
    }
  }, components:{
      chatApp, 
      songList, 
      currSong
  }

}
</script>
