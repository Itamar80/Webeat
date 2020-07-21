<template>
  <div class="station-details flex space-between">
    <chat-app v-if="station" :station="station" />
    <section class="container">
      <curr-song
        v-if="station"
        :station="station"
        :currSong="currSong"
        @toggleLike="toggleLike"
        @changeSong="changeSong"
      />
      <song-list
        v-if="station"
        :songList="songList"
        :currSong="currSong"
        :station="station"
        @addSong="addSong"
        @deleteSong="deleteSong"
        @searchSongs="searchSongs"
        @playSong="setCurrSong"
      />
    </section>
  </div>
</template>

<script>
import { stationService } from "../services/station-service.js";
import { songService } from "../services/song-service.js";
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
    },
    deleteSong(songId) {
     var idx = this.station.songs.findIndex(song=> song._id === songId);
     this.station.songs.splice(idx, 1)
     this.$store.dispatch({ type: "saveStation", station: this.station });
    },
    changeSong(type, currSong) {
      var idx = this.station.songs.findIndex(song => song._id === currSong._id);
      if (type === "nextSong") {
        if (idx + 1 >= this.station.songs.length) {
          idx = -1;
        }
        this.setCurrSong(this.station.songs[idx + 1]);
      } else {
        if (idx - 1 < 0) {
          return;
        }
        this.setCurrSong(this.station.songs[idx - 1]);
      }
    },
    async toggleLike(id, isLiked) {
      const loggedInUser = this.$store.getters.loggedInUser;
      await stationService.toggleLike(id, loggedInUser, isLiked);
      this.getStation(id);
    }
  },
  components: {
    chatApp,
    songList,
    currSong
  }
};
</script>
