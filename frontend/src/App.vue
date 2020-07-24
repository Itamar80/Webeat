<template>
  <div id="app">
    <header :class="navClass">
      <!-- <div class="main-header flex space-between align-center justify-center"> -->
      <span @click="$router.push('/')" class="logo flex align-center justify-center">
        <img class="logo-img" src="./assets/logo2.png" alt />
      </span>
      <nav class="main-nav">
        <!-- <router-link class="nav-btn router-link router-btn" to="/">Home</router-link> -->
        <router-link class="nav-btn router-link router-btn" to="/stations">Stations</router-link>
        <!-- <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link>
        <router-link class="nav-btn router-link router-btn" to="/about">About</router-link>-->
        <router-link class="nav-btn router-link router-btn" to="/edit">Create station</router-link>
        <router-link class="nav-btn router-link router-btn" to="/login">Login</router-link>
      </nav>
      <!-- </div> -->
    </header>
    <router-view />
    <curr-song />
    <app-footer />
  </div>
</template>

<script>
import currSong from "@/components/curr-song.vue";
import appFooter from "@/components/footer.vue";
import stationService from "@/services/station-service.js";
import socketService from "@/services/socket-service.js";

export default {
  data() {
    return {};
  },
  created() {
    socketService.setup();
  },
  computed: {
    navClass() {
      if (this.$route.name === 'home') return 'header transparent flex space-between align-center justify-center'
    else return 'header flex space-between align-center justify-center'
    },
  },
  components: {
    currSong,
    appFooter,
  },
};
</script>






