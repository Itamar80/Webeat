<template>
  <div class="station-details flex space-between">
    <chat-app v-if="station" :station="station" />
    <section v-if="station" class="container">
      <div class="top-section flex justify-center align-center space-between">
        <div class="flex col">
          <h1>{{station.name}}</h1>
          <span>Created By: {{station.createdBy.fullName}}</span>
          <span class="genre capitalize">{{station.genre}}</span>
          <span>
            <font-awesome-icon
              icon="heart"
              size="lg"
              class="icon heart-icon"
              :class="{liked:isLiked}"
              @click.stop="toggleLike(station._id)"
            />
            {{station.likedByUsers.length}}
          </span>
          <span>
            <font-awesome-icon size="lg" :icon="['far', 'clock']" class="icon clock-icon" />
            {{station.songs.length}} tracks
          </span>
          <p>Now Playing: {{currSong.title}}</p>
        </div>
        <img class="cover-img" :src="station.imgUrl" />
      </div>
      <song-list
        v-if="station"
        :songList="youtubeSongList"
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
import socket from "../services/socket-service.js";
import chatApp from "../components/chat-app.vue";
import currSong from "../components/curr-song.vue";
import songList from "../components/song-list.vue";
export default {
  data() {
    return {
      isLiked: false,
    };
  },
  created() {

    console.log('stations from created: ',this.stations)
    let id = this.$route.params.id;
    this.setStation(id);
    socket.emit("join station", id);
    socket.on("song changed", (song) => {
      this.$store.dispatch({ type: "setCurrSong", song });
    });
    socket.on('station changed', station =>{
      console.log(station)
      this.$store.commit({ type: 'setCurrStation', station })
    })
  },
  computed: {
    youtubeSongList() {
      return this.$store.getters.songList;
    },
    station() {
      // console.log("station is", this.$store.getters.currStation);
      return this.$store.getters.currStation;
    },
    currSong() {
      return this.$store.getters.currSong;
    },
    stations() {
      console.log('stations', this.$store.getters.stations);
      return this.$store.getters.stations;
    },
  },
  methods: {
    toggleLike(id) {
      this.isLiked = !this.isLiked;
      this.$emit("toggleLike", id, this.isLiked);
    },
    async setStation(id) {
      await this.$store.dispatch({ type: "getCurrStation", id });
      this.setCurrSong(this.station.songs[0]);
    },
    async searchSongs(songStr) {
      await this.$store
        .dispatch({ type: "searchSong", songStr: songStr })
    },
    async setCurrSong(song) {
      socket.emit("set currSong", song);
      const newCurrSong = await this.$store.dispatch({
        type: "setCurrSong",
        song,
      });
    },
    addSong(song) {
      var station = JSON.parse(JSON.stringify(this.station));
      station.songs.push(song);
      socket.emit("station songs changed", station);
      this.$store.dispatch({ type: "saveStation", station });
    },
    deleteSong(songId) {
      var idx = this.station.songs.findIndex((song) => song._id === songId);
      var station = JSON.parse(JSON.stringify(this.station));
      station.songs.splice(idx, 1);
      socket.emit("station songs changed", station);
      this.$store.dispatch({ type: "saveStation", station });
    },
    changeSong(type, currSong) {
      var idx = this.station.songs.findIndex(
        (song) => song._id === currSong._id
      );
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
      this.setStation(id);
    },
  },
  components: {
    chatApp,
    songList,
    currSong,
  },
};
</script>
