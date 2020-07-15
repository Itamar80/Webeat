<template>
  <div class="station-app">
    <h1>This is the stations page</h1>
   <pre>
     {{stations}}
     </pre> 
  </div>
</template>

<script>
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
          console.log('hey');
        this.$store.dispatch({type: 'loadStations'})
    }
}
</script>
