<template>
  <div class="popular-station-list ">
    <ul class="clean-list popular-grid">
        <station-preview :isPopular="isPopular" :station="station" @toggleLike="toggleLike" v-for="station in popularStations" :key="station._id"></station-preview>
    </ul>
  </div>
</template>

<script>
import stationPreview from './station-preview.vue'
export default {
  props:['stations'],
    computed: {
        popularStations(){
            return this.$store.getters.popularStations
        },
        isPopular(){
          return true
        }
    },
    methods: {
    toggleLike(id, isLiked){
     this.$emit('toggleLike', id, isLiked)
    },
    },
    components: {
      stationPreview
    },
}
</script>
