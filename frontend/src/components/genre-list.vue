<template>
  <ul class="channel-container card-grid">
    <li class="clean-list" v-for="genre in genres" :key="genre">
      <genre-preview :genre="genre" />
    </li>
  </ul>
</template>

<script>
import genrePreview from "./genere-preview.vue";
export default {
  props: {
    genres: Array,
  },
  components: {
    genrePreview,
  },
};
</script>

<style>
</style>