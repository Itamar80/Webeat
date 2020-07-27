         <!-- <h1>Let's get SCHWIFTY!</h1> -->
<template>
  <div class="station-app main-layout">
    <div class="back">
      <div class="create-filter flex justify-center align-center"></div>
      <div class="hero-img">
        <div class="gradient">
          <div class="marketing">
          <h1>Party without borders</h1>
          <h3>
            Listen to music with friends.
            No matter where they're at.
          </h3>
          </div>
          <div class="button-container">
          <button class="scroll-btn" @click="smoothScroll('.h2', 1000)">Start Listening Now</button>
          </div>
          <img src="@/assets/hero1.webp" />
          <img src="@/assets/dribble-red.png" />
          <img src="@/assets/hero3.jpg" />
          <img src="@/assets/hero10c.jpg" />
          <!-- <img src="@/assets/hero12.jpg" /> -->
        </div>
      </div>
    </div>
    <section name="popular" class="homepage container">
      <h2 class="h2">Most popular:</h2>
      <popular-stations @toggleLike="toggleLike" :stations="stations" />
      <h2 class="h2-genres">Genres:</h2>
      <genre-list :genres="genres"/>
    </section>
  </div>
</template>

<script>
import stationList from "../components/station-list.vue";
import stationFilter from "../components/filter-stations.vue";
import popularStations from "../components/popular-stations.vue";
import { stationService } from "@/services/station-service.js";
import  userService  from "@/services/user-service.js";
// import dasfasd from '../assets/genres-pics/'
import genreList from '../components/genre-list.vue'

export default {
  data() {
    return {
      genres: [
        "hiphop",
        "arabic",
        "easy",
        "electronic",
        "country",
        "latin",
        "jazz",
        "rock",
        "pop",
        "classical",
        "alternative",
        "folk",
        "soul",
        "blues",
        "metal",
        "disco",
      ],
      stations: [],
      genre: "",
    };
  },
  created() {
    this.loadStations();
  },
  destroyed() {},
  computed: {
    currStation() {
      return this.$store.getters.currStation;
    },
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
    setFilter(filterBy) {
      //tags/ז'אנר
      this.$store.commit({ type: "setFilter", filterBy: { ...filterBy } });
      this.$store.dispatch({ type: "loadStations" });
      this.loadStations();
    },
    async toggleLike(id, isLiked) {
      const loggedInUser = this.$store.getters.loggedInUser;
      await stationService.toggleLike(id, loggedInUser, isLiked);
      // this.currStation; 
      // this.loadStations();
    },
    async loadStations() {
      this.stations = await this.$store.dispatch({ type: "loadStations" });
    },
    scrollDown() {},
  },

  components: {
    stationList,
    stationFilter,
    popularStations,
    genreList
  },
};
</script>
