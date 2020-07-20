<template>
  <div class="station-app">
    <div class="back">
     <div class="create-filter flex justify-center align-center">
     </div>
      <div class="hero-img">
      <img src="@/assets/hero.jpg" />
      <img src="@/assets/hero1.webp" />
      <img src="@/assets/hero 2.webp" />
      <img src="@/assets/hero3.webp" />
    </div>
    </div>
    <section class="genre-stations">
    <h2 class="h2 container yellow">Most popular:</h2>
    <popular-stations @toggleLike="toggleLike" :stations="stations"/>
    <h2 class="container yellow">Genres:</h2>
    <hr class="hr"/>
    <section class="channel-container container flex">
    <router-link to="stations/hiphop" class="station-cover container">
      <div class="hiphop-channel channel">Hip-Hop</div>
    </router-link>
    <router-link to="stations/arabic" class="station-cover container">
      <div class="rock-channel channel">Rock</div>
    </router-link>
    <router-link to="stations/rock" class="station-cover container">
      <div class="arabic-channel channel">Arabic</div>
    </router-link>
    <router-link to="stations/easy" class="station-cover container">
      <div class="easy-channel channel">Easy listening</div>
    </router-link>
    <router-link to="stations/electronic" class="station-cover container">
      <div class="electronic-channel channel">Electronic</div>
    </router-link>
    <router-link to="stations/country" class="station-cover container">
      <div class="country-channel channel">Country</div>
    </router-link>
    <router-link to="stations/rock" class="station-cover container">
      <div class="arabic-channel channel">Arabic</div>
    </router-link>
    </section>
      <!-- <img /> -->
      <!-- <div class="bottom-details"> -->
        <!-- <span>{{station.likedByUsers.length}}</span>
        <span> {{station.songs.length}} tracks</span> -->
      <!-- </div>   -->
    </section>
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
      stations: [],
      genre:''
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
