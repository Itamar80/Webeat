<template>
  <div class="station-list">
    <ul>
      <li v-for="station in stations" :key="station._id">
        <station-preview :station="station"></station-preview>
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
