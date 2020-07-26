      <!-- <div class="main-header flex space-between align-center justify-center"> -->
        <!-- <router-link class="nav-btn router-link router-btn" to="/">Home</router-link> -->
        <!-- <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link>
        <router-link class="nav-btn router-link router-btn" to="/about">About</router-link>-->
      <!-- </div> -->
<template>
  <div id="app">
    <app-header/>
    <router-view />
    <curr-song />
    <app-footer />
  </div>
</template>

<script>
import currSong from "@/components/curr-song.vue";
import appFooter from "@/components/footer.vue";
import appHeader from "@/components/app-header.vue";
import stationService from "@/services/station-service.js";
import socketService from "@/services/socket-service.js";
import userService from "@/services/user-service.js";

export default {
  data() {
    return {
      isMenuOpen:false
    };
  },
  created() {
    socketService.setup();
    userService.setUser();
  },
  computed: {
    navClass() {
      if (this.$route.name === "home")
        return "header transparent flex space-between align-center justify-center";
      else return "header flex space-between align-center justify-center";
    },
  },
  methods: {
  },
  components: {
    currSong,
    appFooter,
    appHeader,
  },
};
</script>






