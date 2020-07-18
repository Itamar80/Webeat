<template>
  <div class="station-details">
    <song-list
      v-if="station"
      :songList="songList"
      :songs="station.songs"
      @addSong="addSong"
      @searchSongs="searchSongs"
      @playSong="setCurrSong"
    />
    <curr-song :currSong="currSong" />
    <chat-app />
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
      currSong: null
    };
  },
  created() {
    let id = this.$route.params.id;
    this.getStation(id);
    this.currSong = this.$store.getters.currSong;
  },
  computed: {
    songList() {
      return this.$store.getters.songList;
    }
  },
  methods: {
    async getStation(id) {
      let station = await stationService.getById(id);
      this.station = station;
      this.currSong = station.songs[0];
    },
    async searchSongs(songStr) {
      //  console.log(songStr);
      await this.$store
        .dispatch({ type: "searchSong", songStr: songStr })
        .then(songList => {});
    },
    async setCurrSong(song) {
      const newCurrSong = await this.$store.dispatch({
        type: "setCurrSong",
        song
      });
      this.currSong = newCurrSong;
    },
    addSong(song) {
      this.station.songs.push(song);
      this.$store.dispatch({ type: "saveStation", station: this.station });
    }
  },
  components: {
    chatApp,
    songList,
    currSong
  }
};
</script>
