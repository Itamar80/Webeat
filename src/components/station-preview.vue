<template>
  <div class="station-preview ratio-card flex col align-center justify-center" @click="openDetails(station._id)">
     <section class="station-cover ">
     <span class="top-details"> Created By: {{station.createdBy.fullName}}</span>
        <h4>{{station.name}}</h4>
        <img :src="station.imgUrl"/>
      <!-- <span>{{createdAt}}</span> -->
      <div class="bottom-details">
        
          <font-awesome-icon icon="heart" size="lg"  class="heart-icon" @click.stop="addLike" /> 
       
        <span>{{station.likedByUsers.length}}</span>
        <font-awesome-icon size="lg" :icon="['far', 'clock']" class="clock-icon"/>
        <span> {{station.songs.length}} tracks</span>
        </div>
        
      </section>
       
       
  </div>
</template>

<script>
import moment from 'moment';
import {fontAwsomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
 
library.add(faClock)
library.add(faHeart)

export default {
  props:['station'],
  created(){
    console.log(this.station.imgUrl)
  },
  computed:{
    createdAt(){
     return moment(this.station.createdAt).subtract(10, 'days').calendar()
    }
  },
  methods:{
    openDetails(id){
      this.$router.push(`stations/details/${id}`)
    },
    addLike(){
      console.log('like!')
    }
  },components:{
    fontAwsomeIcon
  }
}
</script>
