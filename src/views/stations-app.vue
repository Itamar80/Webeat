<template>
  <div class="station-app ">
     <div class="create-filter flex justify-center align-center">
    <station-filter class="filter" @filterStations="setFilter"/>
     <router-link class="router-link" to="/edit">Create station</router-link>
     </div>
     <station-list class="container" :stations="stations" @toggleLike="toggleLike"></station-list>
  </div>
</template>

<script>
import stationList from '../components/station-list.vue'
import stationFilter from '../components/filter-stations.vue'
import {stationService} from '@/services/station-service.js'

export default {
  data(){
    return {
      stations: []
    }
  },
  created(){
    this.loadStations()
  },
  methods: {
    setFilter(filterBy){
      this.$store.commit({type: 'setFilter', filterBy: {...filterBy}})
      this.$store.dispatch({type: 'loadStations'})
      this.loadStations()
    }, 
    async toggleLike(id, isLiked){
    const loggedInUser = this.$store.getters.loggedInUser
    await stationService.toggleLike(id, loggedInUser, isLiked)
    this.loadStations()
    },
    async loadStations(){
    this.stations = await this.$store.dispatch({type: 'loadStations'})
    }
  },
    
    components:{
      stationList,
      stationFilter
    }
}
</script>
