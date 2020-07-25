<template>
  <div class="popular-station-list flex row space-between">
    <ul class="clean-list flex">
      <station-preview
        v-for="(station,i) in popularStations"
        :key="station._id"
        :index="i"
        :isPopular="isPopular"
        :station="station"
        @toggleLike="toggleLike"
      ></station-preview>
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