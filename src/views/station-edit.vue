<template>
  <div class="station-edit">
    <h1>This is the station edit page</h1>
    <form @submit="addStation">
      <input type="text" placeholder="Enter the station name" v-model="station.name">
      <img width="200" :src="img" />
      <label>
        Station Image:d
        <input type="file" @change="onUploadImg" />
      </label>
      <input type="text" placeholder="Enter the station tags" v-model="tagToAdd"> {{station.tags}}
   <button @click.stop="addTag">Add tag</button>
   <button>Add station</button>
    </form>
  </div>
</template>

<script>
import {stationService} from '../services/station-service.js'
import { uploadImg } from "@/services/imgUpload.service.js";

export default {
data(){
  return{
    station:{
      name:null,
      tags:[],
      songs:[],
      imgUrl:''
    },
    tagToAdd:'',
    img: ''
  }
},
created(){
 this.station = stationService.getEmptyStation();
},
methods:{
  //add songs
  addTag(){
    this.station.tags.push(this.tagToAdd);
    this.tagToAdd='';
  },
  addStation(){
    this.$store.dispatch({type: 'saveStation',station:this.station})
    this.$router.push('/stations')
  },
  async onUploadImg(ev) {
    const res = await uploadImg(ev)
    this.img = res.url;
    this.station.imgUrl = this.img;
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