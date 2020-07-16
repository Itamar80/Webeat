<template>
  <div class="station-preview" @click="openDetails(station._id)">
    <div>
      <section class="station-cover">
      <h4>{{station.name}}</h4>
      <img :src="station.imgUrl"/>
      </section>
      createdAt: {{station.createdAt}}
      createdBy.fullName: {{station.createdBy.fullName}}
      'userIMG'
      likedByUsersCount: {{station.likedByUsers.length}}
      songsCount: {{station.songs.length}}
   </div>
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
