<template>
  <div v-if="stations" class="station-list">
    <button class="btn" v-if="genreFromUrl" @click="moveTo">Return to all stations</button>
    <ul class="clean-list grid">
            <station-preview
            v-for="station in filteredStations" :key="station._id"
              class="station"
              :genre="genre"
              :station="station"
              @toggleLike="toggleLike"
            ></station-preview>
    </ul>
      <!-- <station-preview class="station" :station="station" @toggleLike="toggleLike"></station-preview> -->
      <!-- <div class="block">
        <el-carousel trigger="click" height="150px">
         <el-carousel-item v-for="station in filteredGenres" :key="station._id"> -->
        
          <!-- </el-carousel-item>
        </el-carousel>
      </div> --> 


      <!-- <vueper-slides
  class="no-shadow"
  :visible-slides="3"
  slide-multiple
  :gap="3"
  :slide-ratio="1 / 4"
  :dragging-distance="200"
  :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
  <vueper-slide v-for="i in filteredGenres" :key="i" :title="i.toString()" />
</vueper-slides> -->

    <!-- <div class="block"></div> -->
  </div>
</template>

<script>
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'
import stationPreview from "./station-preview.vue";
export default {
  props: ["stations", "genre"],
  data() {
    return {
      genreFromUrl: "",
      filteredStations: [],
    };
  },
  computed: {},
  created() {
    let genre = this.$route.params.genre;
    this.genreFromUrl = genre;
    this.filterGenre();
  },
  methods: {
    toggleLike(id, isLiked) {
      this.$emit("toggleLike", id, isLiked);
    },
    moveTo(genre) {
      this.$router.push(`/stations`);
      location.reload();
    },
    filterGenre() {
      // console.log('the length', this.filteredStations.length);
      var idx = 4;
      var genreGroups = [];
      var group = [];
      this.filteredStations = this.stations.filter(
        (station) => station.genre === this.genre
      );
      // for (let i = 0; i < this.filteredStations.length; i++) {
      //   if (i !== idx) {
      //     // console.log('the idx in the if', idx, 'and the i is ', i);
      //     group.push(this.filteredStations[i]);
      //     // console.log("should work 4 times", group);
      //   } else {
      //     idx += 4;
      //     // console.log("should work once , the idx is:", idx);
      //     genreGroups.push(group);
      //     group = [];
      //     console.log('what is the genre group',genreGroups);
      //   }
      // }
      // console.log('please god let this work:',genreGroups);
    },
  },
  components: {
    stationPreview,
    // VueperSlides, VueperSlide
  },
};
</script>
