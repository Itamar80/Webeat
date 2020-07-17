<template>
  <section class="youtubeList">
    <ul class="clean-list">
      <li v-for="song in songList.items" :key="song.id.videoId">
        <youtube-song :song="song"/>
      </li>
    </ul>
   
  </section>
</template>

<script>
import youtubeSong from './youtube-song.vue'

export default {
  props: {
    songList: Object
  },
  data() {
    return {};
  },
  components:{
    youtubeSong
  }
};
</script>

<style>
</style>