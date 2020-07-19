<template>
  <div class="popular-station-list container">
    <ul class="clean-list grid">
      <li v-for="station in popularStations" :key="station._id">
        <station-preview :station="station" @toggleLike="toggleLike"></station-preview>
      </li>
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
