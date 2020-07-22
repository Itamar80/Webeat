<template>
  <div class="station-list">
    <button class="btn" v-if="genreFromUrl" @click="moveTo">Return to all stations</button>
    <ul class=" clean-list popular-grid">
      <li  v-for="station in stations" :key="station._id">
        <station-preview class="station" v-if="station.genre===genre" :station="station" @toggleLike="toggleLike"></station-preview>
        <!-- <station-preview class="station" v-else :station="station" @toggleLike="toggleLike"></station-preview> -->
      </li>
    </ul>
  </div>
</template>

<script>
  import stationPreview from './station-preview.vue'
export default {
  props:['stations','genre'],
  data(){
    return{
      genreFromUrl:''
    }
  },
    computed: {
      
    },
    created(){
    let genre = this.$route.params.genre
    this.genreFromUrl = genre
    },
    methods: {
    toggleLike(id, isLiked){
     this.$emit('toggleLike', id, isLiked)
    },
    moveTo(genre){
      this.$router.push(`/stations`)
      location.reload();
    }
    },
    components: {
      stationPreview
    },
}
</script>
