<template>
  <div class="station-details flex row">
    <song-list v-if="station" @searchSongs="searchSongs" :songList="songList" :songs="station.songs" @setCurrSong="setCurrSong" />
    
    <curr-song :currSong="currSong"/>
    <chat-app />
    <pre>{{station}}</pre>
  </div>
</template>

<script>
import { stationService } from "../services/station-service.js";
import chatApp from "../components/chat-app.vue";
import currSong from "../components/curr-song.vue";
import songList from "../components/song-list.vue";
export default {
  data() {
    return {
      station: null,
      currSong: null,
    };
  },
  created() {
    let id = this.$route.params.id;
    this.getStation(id);
   this.currSong = this.$store.getters.currSong

  },
  computed: {
    songList(){
      console.log('indetails',this.$store.getters.songList);
      return this.$store.getters.songList
    } 
  },
  methods: {
    async getStation(id) {
      let station = await stationService.getById(id);
      this.station = station;
    },
    async searchSongs(songStr) {
      //  console.log(songStr);
      await this.$store
        .dispatch({ type: "searchSong", songStr: songStr })
        .then(songList => {});
    },
     async setCurrSong(song){
      // this.$store.dispatch({type: 'setCurrSong', song})
      // this.currSong =  this.$store.getters.currSong
      const newCurrSong = await this.$store.dispatch({type: 'setCurrSong', song});
      this.currSong = newCurrSong
     }
  },
  components: {
    chatApp,
    songList,
    currSong,
    
  }
};
</script>
