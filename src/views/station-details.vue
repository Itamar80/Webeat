<template>
  <div class="station-details">
    <h1>This is the station details page</h1>
  </div>
</template>

<script>
import stationService from '../services/station-service.js'
export default {

 created(){
   let id = this.$route.params.id;
 }

}
</script>
