<template>
  <div class="station-preview ratio-card flex col align-center justify-center" @click="openDetails(station._id)">
      <section class="station-cover ">
        <h4>{{station.name}}</h4>
        <img :src="station.imgUrl"/>
      </section>
       createdAt: {{station.createdAt}}
       createdBy.fullName: {{station.createdBy.fullName}}
        'userIMG'
        likedByUsersCount: {{station.likedByUsers.length}}
        songsCount: {{station.songs.length}}
  </div>
</template>

<script>
export default {
  props:['station'],
  created(){
    console.log(this.station.imgUrl)
  },
  methods:{
    openDetails(id){
      this.$router.push(`stations/details/${id}`)
    }
  }
}
</script>
