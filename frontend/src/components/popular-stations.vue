<template>
  <div class="popular-station-list ">
    <ul class="clean-list ">
   

   <div class="block">
    <!-- <span class="demonstration">Switch when indicator is clicked</span> -->
    <el-carousel trigger="click" >
    <el-carousel-item v-for="station in popularStations" :key="station._id">
        <station-preview :isPopular="isPopular" :station="station" @toggleLike="toggleLike"></station-preview>
      </el-carousel-item>
    </el-carousel>
  </div>
    </ul>
  </div>
</template>

<script>
import stationPreview from './station-preview.vue'
export default {
  props:['stations'],
    computed: {
        popularStations(){
            return this.$store.getters.popularStations
        },
        isPopular(){
          return true
        }
    },
    methods: {
    toggleLike(id, isLiked){
     this.$emit('toggleLike', id, isLiked)
    },
    },
    components: {
      stationPreview
    },
}
</script> 