<template>
  <div id="app">
    <header class="header">
      <div class="main-header flex space-between align-center justify-center container">
        <span @click="$router.push('/')" class="logo">
          <img class="logo-img" src="./assets/logo.png" alt />
        </span>
        <nav>
          <router-link class="nav-btn router-link router-btn" to="/">Home</router-link>
          <router-link class="nav-btn router-link router-btn" to="/stations">Stations</router-link>
          <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link>
          <router-link class="nav-btn router-link router-btn" to="/about">About</router-link>
          <router-link class="nav-btn router-link router-btn" to="/login">Login</router-link>
          <router-link class="nav-btn router-link router-btn" to="/edit">Create station</router-link>
        </nav>
      </div>
    </header>
    <router-view />
    <curr-song-global
      v-if="this.$route.name !== 'stations-details' && currSong && currStation"
      :station="currStation"
      :currSong="currSong"
      @changeSong="changeSong"
      :global="true"
    />
    <!-- <footer class="cofferights flex align-center justify-center">copyright © Nir, Naomi, Itamar 2020</footer> -->
  </div>
</template>

<script>
import currSongGlobal from "@/components/curr-song-global.vue";
import stationService from "@/services/station-service.js";

export default {
  data() {
    return {};
  },
  computed: {
    currStation() {
      console.log("currStation", this.$store.getters.currStation);
      return this.$store.getters.currStation;
    },
    currSong() {
      return this.$store.getters.currSong;
    }
  },
  methods: {
    changeSong(type, currSong) {
      var idx = this.currStation.songs.findIndex(
        song => song._id === currSong._id
      );
      if (type === "nextSong") {
        if (idx + 1 >= this.currStation.songs.length) {
          idx = -1;
        }
        this.setCurrSong(this.currStation.songs[idx + 1]);
      } else {
        if (idx - 1 < 0) {
          return;
        }
        this.setCurrSong(this.currStation.songs[idx - 1]);
      }
    },
    async setCurrSong(song) {
      const newCurrSong = await this.$store.dispatch({
        type: "setCurrSong",
        song
      });
      // this.currSong = newCurrSong;
    }
  },
  components: {
    currSongGlobal
  }
};
</script>






