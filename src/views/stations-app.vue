<template>
<<<<<<< HEAD
  <div class="station-app">
    <station-filter @filterStations="setFilter"/>
    <h1>This is the stations page</h1>
=======
  <div class="station-app ">
>>>>>>> e9d974d07b466f648978dd753cdd8b0b161bb3a3
     <station-list :stations="stations"></station-list>
  </div>
</template>

<script>
  import stationList from '../components/station-list.vue'
  import stationFilter from '../components/filter-stations.vue'
export default {
    computed: {
        stations() {
            return this.$store.getters.stations;
       },
    },
    methods: {
        setFilter(filterBy){
            this.$store.commit({type: 'setFilter', filterBy: filterBy})
            this.$store.dispatch({type: 'loadStations'})
        }, 
    },
        created(){
        this.$store.dispatch({type: 'loadStations'})
    },
    components:{
      stationList,
      stationFilter
    }
}
</script>
