<template>
  <div class="station-list">
    <ul class="clean-list grid">
      <li v-for="station in stations" :key="station._id">
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
