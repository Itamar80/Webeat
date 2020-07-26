<template>
  <section class="youtubeList">
    <ul class="clean-list">
      <li v-for="song in songList.items" :key="song.id.videoId">
        <youtube-song @addSong="addSong" :song="song" />
      </li>
    </ul>
  </section>
</template>

<script>
import youtubeSong from "./youtube-song.vue";

export default {
  props: {
    songList: Object,
  },
  data() {
    return {};
  },
  created(){
  },
  methods: {
    addSong(song) {
      this.$emit("addSong", song);
    }
  },
  components: {
    youtubeSong
  }
};
</script>

<style>
</style>