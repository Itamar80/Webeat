<template>
  <div class="station-preview" @click="openDetails(station._id)">
    <pre>
      name: {{station.name}}
      'stationIMG'
      createdAt: {{station.createdAt}}
      createdBy.fullName: {{station.createdBy.fullName}}
      'userIMG'
      likedByUsersCount: {{station.likedByUsers.length}}
      songsCount: {{station.songs.length}}
   </pre>
  </div>
</template>

<script>
export default {
  props:['station'],
  methods:{
    openDetails(id){
      this.$router.push(`stations/details/${id}`)
    }
  }
}
</script>
