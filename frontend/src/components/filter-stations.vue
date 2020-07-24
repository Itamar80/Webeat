<template>
<div class="input-container">
    <input class="filter-stations" @input="filterStations" type="text" placeholder="filter stations" v-model="filterBy.name">
  <div class="search"></div>
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

