<template>
  <div id="app">
    <header class="header">
      <div class="main-header flex space-between align-center justify-center">
        <span @click="$router.push('/')" class="logo">
          <img class="logo-img" src="./assets/logo.png" alt />
        </span>
        <nav class="main-nav">
          <!-- <router-link class="nav-btn router-link router-btn" to="/">Home</router-link> -->
          <router-link class="nav-btn router-link router-btn" to="/stations">Stations</router-link>
          <!-- <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link>
          <router-link class="nav-btn router-link router-btn" to="/about">About</router-link> -->
          <router-link class="nav-btn router-link router-btn" to="/edit">Create station</router-link>
          <router-link class="nav-btn router-link router-btn" to="/login">Login</router-link>
        </nav>
      </div>
    </header>
    <router-view />
    <curr-song    />
    <footer class="coffeerights flex align-center justify-center">copyright © Nir, Naomi, Itamar 2020</footer>
  </div>
</template>

<script>
import currSong from "@/components/curr-song.vue";
import stationService from "@/services/station-service.js";
import socketService from "@/services/socket-service.js";

export default {
  data() {
    return {};
  },
  created() {
    
  // this.$store.dispatch({type: 'loadStations'})
   
    socketService.setup();
  },
  components: {
    currSong
  }
};
</script>






