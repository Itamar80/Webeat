<template>
  <div class="stations-page">
    <div class="container">
    <station-filter class="filter" @filterStations="setFilter"/>
    </div>
      <section class="genre-stations">
    <h1 v-if="genre" class="h1 container yellow">Genre: {{genre.charAt(0).toUpperCase()+ genre.slice(1)}}</h1>
    <h1 v-else class="h1 container yellow"> Stations</h1>
     <station-list class="container" v-if="genre" :genre="genre" :stations="stations" @toggleLike="toggleLike"></station-list>
     <section class="all-stations" v-else>
    <div class="container flex space-between">
    <h3 class="">Hip-Hop</h3>
     <span @click="moveTo('hiphop')">Show All</span>
    </div>
    <hr/>
     <station-list class="container" :genre="'hiphop'" :stations="stations" @toggleLike="toggleLike"></station-list>
     <div class="container flex space-between">
    <h3 class="">Arabic</h3>
    <span @click="moveTo('arabic')">Show All</span>
    </div>
    <hr/>
     <station-list class="container" :genre="'arabic'"  :stations="stations" @toggleLike="toggleLike"></station-list>
    <div class="container flex space-between">
    <h3 class="">Rock</h3>
     <span @click="moveTo('rock')">Show All</span>
    </div>
    <hr/>
     <station-list class="container" :genre="'rock'"  :stations="stations" @toggleLike="toggleLike"></station-list>
    <div class="container flex space-between">
    <h3 class="">Easy</h3>
     <span @click="moveTo('easy')">Show All</span>
    </div>
     <station-list class="container" :genre="'easy'"  :stations="stations" @toggleLike="toggleLike"></station-list>
    <hr/>
    <div class="container flex space-between">
    <h3 class="">Electronic</h3>
     <span @click="moveTo('electronic')">Show All</span>
    </div>
    <hr/>
     <station-list class="container" :genre="'electronic'"  :stations="stations" @toggleLike="toggleLike"></station-list>
    <div class="container flex space-between">
    <h3 class="">Pop</h3>
     <span @click="moveTo('pop')">Show All</span>
    </div>
    <hr/>
     <station-list class="container" :genre="'pop'"  :stations="stations" @toggleLike="toggleLike"></station-list>
    <div class="container flex space-between">
    <h3 class="">Jazz</h3>
     <span @click="moveTo('jazz')">Show All</span>
    </div>
    <hr/>
     <station-list class="container" :genre="'jazz'"  :stations="stations" @toggleLike="toggleLike"></station-list>
     </section>
    </section>
  </div>
</template>

<script>
import stationList from '../components/station-list.vue'
import popularStations from '../components/popular-stations.vue'
import stationFilter from '../components/filter-stations.vue'
import {stationService} from '../services/station-service.js'

export default {
  data(){
    return {
      stations: [],
      genre:''
    }
  },
  created(){
    let genre = this.$route.params.genre
    this.genre = genre
    this.loadStations(genre)
   
  },
  methods: {
    setFilter(filterBy){
      let genre = this.$route.params.genre
      this.$store.commit({type: 'setFilter', filterBy: {...filterBy}})
      this.$store.dispatch({type: 'loadStations'})
      this.loadStations(genre)
    }, 
    async toggleLike(id, isLiked){
    const loggedInUser = this.$store.getters.loggedInUser
    await stationService.toggleLike(id, loggedInUser, isLiked)
    this.loadStations()
    },
    async loadStations(genre){
    this.stations = await this.$store.dispatch({type: 'loadStations',genre})
    },
    moveTo(genre){
      this.$router.push(`/stations/${genre}`)
      location.reload();
    }
  },
    
    components:{
      stationList,
      stationFilter,
      popularStations
    }
}
</script>
