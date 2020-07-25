<template>
  <div class="popular-station-list">
    <ul class="clean-list">
      <!-- <div class="block"> -->
        <!-- <carousel-3d> -->
          <li v-for="(station,i) in popularStations" :key="station._id" :index="i">
             <station-preview :isPopular="isPopular" :station="station" @toggleLike="toggleLike"></station-preview>
          </li>
        <!-- </carousel-3d> -->
    
        <!-- <span class="demonstration">Switch when indicator is clicked</span> -->
        <!-- <el-carousel :interval="8000" type="card" trigger="click">
          <el-carousel-item v-for="station in popularStations" :key="station._id">
            <station-preview :isPopular="isPopular" :station="station" @toggleLike="toggleLike"></station-preview>
          </el-carousel-item>
        </el-carousel> -->
      <!-- </div> -->
    </ul>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import stationPreview from "./station-preview.vue";
export default {
  props: ["stations"],
  computed: {
    popularStations() {
      return this.$store.getters.popularStations;
    },
    isPopular() {
      return true;
    },
  },
  methods: {
    toggleLike(id, isLiked) {
      this.$emit("toggleLike", id, isLiked);
    },
  },
  components: {
    stationPreview,
    Carousel3d,
    Slide,
  },
};
</script> 