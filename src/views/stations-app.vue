<template>
  <div class="station-app">
    <h1>This is the stations page</h1>
     <station-list :stations="stations"></station-list>
  </div>
</template>

<script>
  import stationList from '../components/station-list.vue'
export default {
    computed: {
        stations() {
            return this.$store.getters.stations;
       },
    },
    // methods: {
    //     setFilter(filterBy){
    //         this.$store.commit({type: 'updateFilterBy', filter: filterBy})
    //         this.$store.dispatch({type: 'loadStations'})
    //     }, 
    // },
    // components: {
    //     stationList,
    //     stationFilter
    // },
        created(){
        this.$store.dispatch({type: 'loadStations'})
    },
    components:{
      stationList
    }
}
</script>
