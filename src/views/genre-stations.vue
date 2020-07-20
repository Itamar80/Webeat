<template>
  <div class="genre-stations">
    <div class="container">
    <station-filter class="filter" @filterStations="setFilter"/>
      <section class="genre-stations">
    <h2 class="container yellow">Genres:</h2>
    <hr class="hr"/>
    <h3 class="container nav-color">Hip-hop:</h3>
     <station-list class="container" :genre="'hiphop'" :stations="stations" @toggleLike="toggleLike"></station-list>
    <hr/>
    <h3 class="container nav-color">Arabic:</h3>
     <station-list class="container" :genre="'arabic'" :stations="stations" @toggleLike="toggleLike"></station-list>
    <hr/>
    <h3 class="container nav-color">Electronic:</h3>
     <station-list class="container" :genre="'electronic'" :stations="stations" @toggleLike="toggleLike"></station-list>
    <hr/>
    <h3 class="container nav-color">Jazz:</h3>
     <station-list class="container" :genre="'jazz'" :stations="stations" @toggleLike="toggleLike"></station-list>
    <hr/>
    <h3 class="container nav-color">Rock:</h3>
     <station-list class="container" :genre="'rock'" :stations="stations" @toggleLike="toggleLike"></station-list>
    </section>
    </div>
  </div>
</template>

<script>
import stationList from '../components/station-list.vue'
import popularStations from '../components/popular-stations.vue'
import stationFilter from '../components/filter-stations.vue'

        // <!-- <router-link :to="'/stations'" class="button">Get Started</router-link> -->
export default {
  data(){
    return {
      stations: [],
      genre:''
    }
  },
  created(){
    let genre = this.$route.params.genre
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
    }
  },
    
    components:{
      stationList,
      stationFilter,
      popularStations
    }
}
</script>
