<template>
  <div class="station-app">
    <station-filter @filterStations="setFilter"/>
    <h1>This is the stations page</h1>
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
