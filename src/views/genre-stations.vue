<template>
  <div class="stations-page">
    <div class="container">
    </div>
     <section class="genre-stations"> 
    <h1 v-if="genre" class="h1 container yellow">Genre: {{genre.charAt(0).toUpperCase()+ genre.slice(1)}}</h1>
    <h1 v-else class="h1 container yellow"> Stations</h1>
    <div class="flex justify-center align-center">
    <station-filter class="filter" @filterStations="setFilter"/>
      <font-awesome-icon @click="setFilter" icon="search" size="lg"  class="search-icon"/>
    </div>
     <station-list class="container" v-if="genre"  :genre="genre" :stations="stations" @toggleLike="toggleLike"></station-list>
     <section class="all-stations" v-else  v-for="singleGenre in genres" :key="singleGenre">
    <div v-if="stationsGenresMap[singleGenre]>0" class="genre-header container flex space-between">
    <h3 class="">{{singleGenre.charAt(0).toUpperCase()+singleGenre.slice(1)}}</h3>
     <span class="show-all" @click="moveTo(singleGenre)">Show All</span>
    </div>
    <div v-if="stationsGenresMap[singleGenre]>0" class="background container">
    <!-- <hr/> -->
   <station-list class="container"   :genre="singleGenre" :stations="stations" @toggleLike="toggleLike"></station-list>
    </div>
     </section> 
    </section>
  </div>
</template>

<script>
import stationList from '../components/station-list.vue'
import popularStations from '../components/popular-stations.vue'
import stationFilter from '../components/filter-stations.vue'
import {stationService} from '../services/station-service.js'
import {fontAwsomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch)

export default {
  data(){
    return {
      stations: [],
      genres:['hiphop','arabic','easy','electronic','country','flamenco','jazz','rock','pop'],
      genre:'',
      stationsGenresMap:null,
      
    }
  },
  computed:{
    genresMap(){
     return this.$store.getters.genresMap;
    },
  },
  created(){
    let genre = this.$route.params.genre
    this.genre = genre
    this.stationsGenresMap = this.genresMap
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
      popularStations,
      fontAwsomeIcon
    }
}
</script>
