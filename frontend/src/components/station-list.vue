<template>
  <div v-if="stations" class="station-list">
    <button class="btn" v-if="genreFromUrl" @click="moveTo">Return to all stations</button>
    <ul v-if="isPreview" class="clean-list grid preview">
      <station-preview
        v-for="station in getRandomFour"
        :key="station._id"
        class="station"
        :genre="genre"
        :station="station"
        @toggleLike="toggleLike"
      ></station-preview>
    </ul>
    <ul v-else class="clean-list grid">
      <station-preview
        v-for="station in stations"
        :key="station._id"
        class="station"
        :genre="genre"
        :station="station"
        @toggleLike="toggleLike"
      ></station-preview>
    </ul>
  </div>
</template>

<script>
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'
import stationPreview from "./station-preview.vue";
export default {
  props: ["stations", "genre", "isPreview"],
  data() {
    return {
      genreFromUrl: "",
      filteredStations: [],
    };
  },
  computed: {
    getRandomFour() {
      var stationsForPreview = [];
      var stationByGenre = this.stations.filter(station => {
        if (station.genre === this.genre){
          return station}
          else return
      });
      for (var i = 1; i <= 4; i++) {
        var station = stationByGenre[Math.floor(Math.random() * stationByGenre.length)];
        var douplicatedStation = stationsForPreview.find(
          (stationInArray) => stationInArray._id === station._id
        );
        if (douplicatedStation) {
          i--;
          continue;
        }
        stationsForPreview.push(station);
      }
      console.log(stationsForPreview);
      return stationsForPreview;
    },
  },
  created() {
    let genre = this.$route.params.genre;
    this.genreFromUrl = genre;

    // this.filterGenre();
  },
  methods: {
    toggleLike(id, isLiked) {
      this.$emit("toggleLike", id, isLiked);
    },
    moveTo(genre) {
      this.$router.push(`/stations`);
      location.reload();
    },

    // filterGenre() {
    //   this.filteredStations = this.stations.filter(
    //     (station) => station.genre === this.genre
    //   );
    // },
  },
  components: {
    stationPreview,
    // VueperSlides, VueperSlide
  },
};
</script>
