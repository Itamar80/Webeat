<template>
  <div class="stations-page main-layout">
    <div class="">
    </div>
     <section class="genre-stations"> 
    <h1 v-if="genre" class="h1  yellow capitalize">Genre: {{genre}}</h1>
    <h1 v-else class="h1 container yellow"> Stations</h1>
    <div class="flex justify-center align-center">
    <station-filter  v-if="genre" class="filter" @filterStations="setFilter"/>
      <!-- <font-awesome-icon @click="setFilter" icon="search" size="lg"  class="search-icon"/> -->
    </div>
     <station-list class="container stations-by-gener" v-if="genre"  :genre="genre" :stations="stations" @toggleLike="toggleLike"></station-list>
     <section class="all-stations" v-else  v-for="singleGenre in genres" :key="singleGenre">
    <div v-if="genresMap[singleGenre]>0" class="genre-header container flex space-between">
   <!-- titlecase css span -->
    <h3 class="capitalize">{{singleGenre}}</h3>
     <span class="show-all" @click="moveTo(singleGenre)">Show All</span>
    </div>
    <div v-if="genresMap[singleGenre]>0" class="background container">
    <!-- <hr/> -->
   <station-list class="container" :genre="singleGenre" :stations="stations" @toggleLike="toggleLike"></station-list>
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
     
      genres:['hiphop','arabic','easy','electronic','country','flamenco','jazz','rock','pop'],
      genre:'',
      
    }
  },
  computed:{
    genresMap(){
     return this.$store.getters.genresMap;
    },
    stations(){
       console.log('stations  after adding like  name bbb: ',this.$store.getters.stations[8].likedByUsers.length);
      return this.$store.getters.stations
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
     toggleLike(id, isLiked){
    const loggedInUser = this.$store.getters.loggedinUser
    this.$store.dispatch({type:'toggleLike',id,isLiked,loggedInUser})
    // await stationService.toggleLike(id, loggedInUser, isLiked)
    // this.loadStations()
    },
    loadStations(genre){
     this.$store.dispatch({type: 'loadStations',genre})
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
