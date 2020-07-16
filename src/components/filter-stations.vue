<template>
  <div class="filter-stations">
    <input @input="filterStations" type="text" placeholder="filter stations" v-model="filterBy.name">
  </div>
</template>

<script>
export default {
  data(){
    return{
      filterBy:{
        name:null
      }
    }
  },
methods:{
  filterStations(){
    this.$emit('filterStations',this.filterBy)
  }
}
}
</script>

