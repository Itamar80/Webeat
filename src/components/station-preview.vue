<template>
  <div class="station-preview ratio-card flex col align-center justify-center" @click="openDetails(station._id)">
      <section class="station-cover ">
        <h4>{{station.name}}</h4>
        <img :src="station.imgUrl"/>
      <!-- <span>{{createdAt}}</span> -->
      <font-awesome-icon icon="user-secret" />
     <span> By: {{station.createdBy.fullName}}</span>
        likedByUsersCount: {{station.likedByUsers.length}}
      </section>
<!--        
        'userIMG'
        songsCount: {{station.songs.length}} -->
  </div>
</template>

<script>
import moment from 'moment';
import {fontAwsomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
 
library.add(faUserSecret)

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
    }
  },components:{
    fontAwsomeIcon
  }
}
</script>
