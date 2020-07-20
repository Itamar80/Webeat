<template>
  <div class="stations-page">
    <div class="container">
    </div>
     <section class="genre-stations"> 
    <h1 v-if="genre" class="h1 container yellow">Genre: {{genre.charAt(0).toUpperCase()+ genre.slice(1)}}</h1>
    <h1 v-else class="h1 container yellow"> Stations</h1>
    <station-filter class="filter flex justify-center" @filterStations="setFilter"/>
     <station-list class="container" v-if="genre"  :genre="genre" :stations="stations" @toggleLike="toggleLike"></station-list>
     <section class="all-stations" v-else  v-for="singleGenre in genres" :key="singleGenre">
    <div class="container flex space-between">
    <h3 class="">{{singleGenre.charAt(0).toUpperCase()+singleGenre.slice(1)}}</h3>
     <span class="show-all" @click="moveTo(singleGenre)">Show All</span>
    </div>
    <hr/>
   <station-list class="container" :genre="singleGenre" :stations="stations" @toggleLike="toggleLike"></station-list>
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
      genres:['hiphop','arabic','easy','electronic','country','flamenco','jazz','rock','pop'],
      genre:'',
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
