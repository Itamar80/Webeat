<template>
  <div class="station-edit">
    <h1>This is the station edit page</h1>
    <form @submit="addStation">
      <input type="text" placeholder="Enter the station name" v-model="station.name">
      <label>uploadImg</label>
      <input type="text" placeholder="Enter the station tags" v-model="tagToAdd"> {{station.tags}}
   <button @click.stop="addTag">Add tag</button>
   <button>Add station</button>
    </form>
  </div>
</template>

<script>
import {stationService} from '../services/station-service.js'
export default {
data(){
  return{
    station:{
      name:null,
      tags:[],
      songs:[]
    },
    tagToAdd:'',
  }
},
created(){
 this.station = stationService.getEmptyStation();
},
methods:{
  addTag(){
    this.station.tags.push(this.tagToAdd);
    this.tagToAdd='';
  },
  addStation(){
    this.$store.dispatch({type: 'saveStation',station:this.station})
  }
},
components:{
  stationService
}
}
</script>
// function getEmptyStation() {
//     return {
//         name: '',
//         imgUrl: '',
//         tags: [],
//         createdAt: Date.now(),
//         createdBy: {},
//         likedByUsers: [],
//         songs: []

//     }
// }