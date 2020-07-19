<template>
  <div class="station-app">
    <div class="back">
      <div class="hero-img">
      <img src="@/assets/hero.jpg" />
      <img src="@/assets/hero1.webp" />
      <img src="@/assets/hero 2.webp" />
      <img src="@/assets/hero3.webp" />
    </div>
    </div>
    <h2 class="h2 container">Most popular:</h2>
    <popular-stations @toggleLike="toggleLike" :stations="stations"/>
    <h2 class="container">Genre:</h2>
    <hr/>
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
import popularStations from '../components/popular-stations.vue'
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
      //tags/ז'אנר 
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
      stationFilter,
      popularStations
    }
}
</script>
