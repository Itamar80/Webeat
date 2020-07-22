         <!-- <h1>Let's get SCHWIFTY!</h1> -->
<template>
  <div class="station-app main-layout">
    <div class="back">
     <div class="create-filter flex justify-center align-center">
     </div>
      <div class="hero-img">
    <div class="gradient">
        <h1>Party without borders</h1>
        <h3>Listen to music with friends.
          No matter where they're at.</h3>
      <img src="@/assets/hero.jpg" />
      <img src="@/assets/hero2.jpg" />
      <img src="@/assets/hero3.jpg" />
      <img src="@/assets/hero2.jpg" />
    </div>
    </div>
    </div>
    <section class="homepage">
    <h2 class="h2  ">Most popular:</h2>
    <popular-stations @toggleLike="toggleLike" :stations="stations"/>
    <h2 class="h2-genres ">Genres:</h2>
    <section class="channel-container card-grid">
      <!-- <div> -->
    <router-link to="stations/hiphop" class="station-cover  flex">
    <img src="../assets/genres-pics/hiphop1.jpg" alt="genre image">
    <span class="hiphop-channel channel flex flex-start align-center col">
     <h3>Hip-Hop</h3>
    <p>Show more</p>
      </span>
    </router-link>
      <!-- </div> -->
    <router-link to="stations/rock" class="station-cover  flex">
    <img src="../assets/genres-pics/rock2.jpg" alt="genre image">
      <span class="rock-channel channel flex flex-start align-center col">
       <h3>Rock</h3>
        <p>Show more</p>
        </span>
    </router-link>
    <router-link to="stations/arabic" class="station-cover  flex">
    <img src="../assets/genres-pics/arabic.jpg" alt="genre image">
      <span class="arabic-channel channel flex flex-start align-center col">
       <h3>Arabic</h3>
        <p>Show more</p>
        </span>
    </router-link>
    <router-link to="stations/easy" class="station-cover  flex">
    <img src="../assets/genres-pics/easy.webp" alt="genre image">
      <span class="easy-channel channel flex flex-start align-center col">
       <h3>Easy</h3>
        <p>Show more</p>
        </span>
    </router-link>
    <router-link to="stations/electronic" class="station-cover  flex">
    <img src="../assets/genres-pics/electronic.jpg" alt="genre image">
     <span class="electronic-channel channel flex flex-start align-center col">
       <h3>Electronic</h3>
        <p>Show more</p>
        </span>
    </router-link>
    <router-link to="stations/country" class="station-cover  flex">
    <img src="../assets/genres-pics/country1.jpg" alt="genre image">
     <span class="country-channel channel flex flex-start align-center col">
       <h3>Country</h3>
        <p>Show more</p>
        </span>
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
// import dasfasd from '../assets/hero3.webp'

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
