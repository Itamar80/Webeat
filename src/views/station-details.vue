<template>
  <div class="station-details">
    <!-- <h1>This is the station details page</h1> -->
    <chat-app/>
    <pre>{{station}}</pre>
  </div>
</template>

<script>
import {stationService} from '../services/station-service.js'
import chatApp from '../components/chat-app.vue'
export default {
  data(){
    return{
      station: null
    }
  },
  created(){
   let id = this.$route.params.id;
   this.getStation(id)
  },
  methods:{
    async getStation(id){
      let station = await stationService.getById(id)
      this.station = station
    }
  }, components:{
chatApp
  }

}
</script>
