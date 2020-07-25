         <!-- <h1>Let's get SCHWIFTY!</h1> -->
<template>
  <div class="station-app main-layout">
    <div class="back">
      <div class="create-filter flex justify-center align-center"></div>
      <div class="hero-img">
        <div class="gradient">
          <h1>Party without borders</h1>
          <h3>
            Listen to music with friends.
            No matter where they're at.
          </h3>
          <button class="scroll-btn" @click="smoothScroll('.h2', 1000)">Start Listening Now</button>
          <img src="@/assets/hero1.webp" />
          <img src="@/assets/dribble-red.png" />
          <img src="@/assets/hero3.jpg" />
          <img src="@/assets/hero10c.jpg" />
          <!-- <img src="@/assets/hero12.jpg" /> -->
        </div>
      </div>
    </div>
    <section name="popular" class="homepage">
      <h2  class="h2">Most popular:</h2>
      <popular-stations @toggleLike="toggleLike" :stations="stations" />
      <h2 class="h2-genres">Genres:</h2>
      <section class="channel-container card-grid">
       <div> 
          <!-- <ul>
            <li class="clean-list" v-for="genre in genres" :key="genre">
        <router-link :to="'stations/'+genre" class="station-cover flex">
          <img :src="'../assets/genres-pics/'+genre+'.jpg'" alt="genre image" />
          <span :class="genre+'-channel channel flex flex-start align-center col'">
            <h3 class="capitalize">{{genre}}</h3>
            <p>Show more</p>
          </span>
        </router-link>
            </li>
          </ul>  -->
         <router-link to="stations/hiphop" class="station-cover flex">
          <img src="../assets/genres-pics/hiphop.jpg" alt="genre image" />
          <span class="hiphop-channel channel flex flex-start align-center col">
            <h3>Hip-Hop</h3>
            <p>Show more</p>
          </span>
        </router-link>
         </div> 
         <router-link to="stations/rock" class="station-cover flex">
          <img src="../assets/genres-pics/rock.jpg" alt="genre image" />
          <span class="rock-channel channel flex flex-start align-center col">
            <h3>Rock</h3>
            <p>Show more</p>
          </span>
        </router-link>
        <router-link to="stations/arabic" class="station-cover flex">
          <img src="../assets/genres-pics/arabic.jpg" alt="genre image" />
          <span class="arabic-channel channel flex flex-start align-center col">
            <h3>Arabic</h3>
            <p>Show more</p>
          </span>
        </router-link>
        <router-link to="stations/easy" class="station-cover flex">
          <img src="../assets/genres-pics/easy.webp" alt="genre image" />
          <span class="easy-channel channel flex flex-start align-center col">
            <h3>Easy</h3>
            <p>Show more</p>
          </span>
        </router-link>
        <router-link to="stations/electronic" class="station-cover flex">
          <img src="../assets/genres-pics/electronic.jpg" alt="genre image" />
          <span class="electronic-channel channel flex flex-start align-center col">
            <h3>Electronic</h3>
            <p>Show more</p>
          </span>
        </router-link>
        <router-link to="stations/country" class="station-cover flex">
          <img src="../assets/genres-pics/country.jpg" alt="genre image" />
          <span class="country-channel channel flex flex-start align-center col">
            <h3>Country</h3>
            <p>Show more</p>
          </span>
        </router-link>
       <!-- <img /> -->
      <!-- <div class="bottom-details"> -->
      <!-- <span>{{station.likedByUsers.length}}</span>
      <span> {{station.songs.length}} tracks</span>-->
      <!-- </div>   -->
      </section> 
    </section>
  </div>
</template>

<script>
import stationList from "../components/station-list.vue";
import stationFilter from "../components/filter-stations.vue";
import popularStations from "../components/popular-stations.vue";
import { stationService } from "@/services/station-service.js";
// import dasfasd from '../assets/genres-pics/'

export default {
  data() {
    return {
       genres:['hiphop','arabic','easy','electronic','country','flamenco','jazz','rock','pop'],
      stations: [],
      genre: "",
    };
  },
  created() {
    this.loadStations();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    smoothScroll(target, duration) {
      var target = document.querySelector(target);
      var targetPosition = target.getBoundingClientRect().top;
      var startingPosition = window.pageYOffset;
      var distance = targetPosition - startingPosition;
      var startTime = null;
      function animationScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startingPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animationScroll);
      }
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }
      requestAnimationFrame(animationScroll);
    },
    handleScroll(event) {
      // if (window.scrollY=== 0)
      // document.querySelector('.main-nav')
      // console.log(event)
    },
    setFilter(filterBy) {
      //tags/ז'אנר
      this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });
      this.$store.dispatch({ type: "loadStations" });
      this.loadStations();
    },
    async toggleLike(id, isLiked) {
      const loggedInUser = this.$store.getters.loggedInUser;
      await stationService.toggleLike(id, loggedInUser, isLiked);
      this.loadStations();
    },
    async loadStations() {
      this.stations = await this.$store.dispatch({ type: "loadStations" });
    },
    scrollDown(){

    }
  },

  components: {
    stationList,
    stationFilter,
    popularStations,
  },
};
</script>
