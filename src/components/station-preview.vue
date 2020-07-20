<template>
  <div class="station-preview ratio-card flex col align-center justify-center" @click="openDetails(station._id)">
    <section class="station-cover ">
    <img :src="station.imgUrl"/>
    </section>
    <div class="preview-details flex space-between align-center">
   <font-awesome-icon  icon="play-circle" size="lg" class="play-icon" />
      <section class="">
       <h2>{{station.name}}</h2>
      <font-awesome-icon size="lg" :icon="['far', 'clock']" class="clock-icon"/>
      <span> {{station.songs.length}} tracks</span>
      </section>
      <section class="like-section">
       <font-awesome-icon icon="heart" size="lg"  class="heart-icon" :class="{liked:isLiked}" @click.stop="toggleLike(station._id)" /> 
       <span>{{station.likedByUsers.length}}</span>
      </section>
       <div>
    </div>
       </div>
       
       
  </div>
</template>
      // <span class="top-details"> Created By: {{station.createdBy.fullName}}</span>
      // <img :src="station.imgUrl"/>
      // <div class="bottom-details">
      // </div>  

<script>
import moment from 'moment';
import {fontAwsomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


 
library.add(faHeart)
library.add(faClock)
library.add(faPlayCircle)

export default {
  props:['station'],
  data(){
    return {
      isLiked: false
    }
  },
  // created(){
  //   console.log(this.station.imgUrl)
  // },
  computed:{
    createdAt(){
     return moment(this.station.createdAt).subtract(10, 'days').calendar()
    }
  },
  methods:{
    openDetails(id){
      this.$router.push(`stations/details/${id}`)
    },
    toggleLike(id){
    this.isLiked = !this.isLiked
    this.$emit('toggleLike', id, this.isLiked)
    }
  },
  components:{
    fontAwsomeIcon
  }
}
</script>
