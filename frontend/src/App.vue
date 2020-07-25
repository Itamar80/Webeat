      <!-- <div class="main-header flex space-between align-center justify-center"> -->
        <!-- <router-link class="nav-btn router-link router-btn" to="/">Home</router-link> -->
        <!-- <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link>
        <router-link class="nav-btn router-link router-btn" to="/about">About</router-link>-->
      <!-- </div> -->
<template>
  <div id="app">
    <!-- <header :class="navClass">
      <span @click="$router.push('/')" class="logo flex align-center justify-center">
        <img class="logo-img" src="./assets/welogo.png" alt />
      </span>
        <span @click="toggleMenu" class="hamburger">☰</span>
      <nav class="main-nav">
        <router-link @click.native="toggleMenu()" class="nav-btn router-link router-btn" to="/stations">Stations</router-link>
        <router-link @click.native="toggleMenu()" class="nav-btn router-link router-btn" to="/edit">Create station</router-link>
        <router-link @click.native="toggleMenu()" class="nav-btn router-link router-btn" to="/login">Login</router-link>
      </nav>
    </header> -->
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
    this.loadStations();
  },
  computed: {
    navClass() {
      if (this.$route.name === "home")
        return "header transparent flex space-between align-center justify-center";
      else return "header flex space-between align-center justify-center";
    },
  },
  methods: {
    async loadStations() {
      await this.$store.dispatch({ type: "loadStations" });
    },
  },
      methods:{
        // toggleMenu() {
        //         // this.isMenuOpen = !this.isMenuOpen
        //         console.log(this.isMenuOpen ,'menu open?');
        //         // document.body.classList.toggle('menuopen')
        //     }
      //   async loadStations() {
      //   await this.$store.dispatch({ type: "loadStations" });
      // },
      },
  components: {
    currSong,
    appFooter,
    appHeader,
  },
};
</script>






