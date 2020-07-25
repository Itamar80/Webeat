<template>
  <div class="genre">
    <router-link :to="'stations/'+genre" class="station-cover flex">
    <img :src="genreImg"  />
      <span :class="genre+'-channel channel flex flex-start align-center col'">
        <h3 class="capitalize">{{genre}}</h3>
        <p>Show more</p>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    genre: String,
  },
  data() {
    return {
      genreImg: require(`@/assets/genres-pics/${this.genre}.jpg`),
    };
  },
  methods:{
//     getImgUrl(genre) {
//     var images = require.context('../assets/', false, /\.jpg$/)
//     return images('./genre-pics/' + genre + ".jpg")
//  }
  }
};
</script>

<style>
</style>