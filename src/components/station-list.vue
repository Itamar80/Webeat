<template>
  <div class="station-list">
    <ul class="station-genre-list clean-list flex">
      <li  v-for="station in stations" :key="station._id">
        <station-preview class="station" v-if="station.genre===genre" :station="station" @toggleLike="toggleLike"></station-preview>
      </li>
    </ul>
  </div>
</template>

<script>
  import stationPreview from './station-preview.vue'
export default {
  props:['stations','genre'],
    computed: {
    },
    methods: {
    toggleLike(id, isLiked){
     this.$emit('toggleLike', id, isLiked)
    },
        // setFilter(filterBy){
        //     this.$store.commit({type: 'updateFilterBy', filter: filterBy})
        //     this.$store.dispatch({type: 'loadStations'})
        // }, 
    },
    components: {
      stationPreview
    },
}
</script>
