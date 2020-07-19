<template>
  <section class="song-list">
    <section class="song-search">
      <input type="text" v-model="songToFind" />
      <button class="btn edit-sub-btn" @click.prevent="searchSongs">Search songs</button>
    </section>
     <vue-custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
      <section v-if="!songList || !songToFind" class="songlist-container">
        <ul class="clean-list">
          <li v-for="song in songs" :key="song._id">
            <songListPrev @playSong="playSong" :song="song" />
          </li>
        </ul>
      </section>
      <youtubeSongs v-else @addSong="addSong" :songList="songList" />
    </vue-custom-scrollbar>
  </section>
</template>
 
<script>
import songListPrev from "../components/songlist-prev.vue";
import youtubeSongs from "../components/youtube-songs.vue";
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  props: {
    songs: Array,
    songList: Object
  },
  data() {
    return {
      songToFind: "",
       settings: {
        maxScrollbarLength: 60,
      }
    };
  },
  methods: {
    searchSongs() {
      console.log(this.songToFind);
      if (this.songToFind) {
        this.$emit("searchSongs", this.songToFind);
      } else {
        this.$emit("toggleList");
      }
    },
    addSong(song) {
      this.$emit("addSong", song);
      this.songToFind = "";
    },
    playSong(song) {
      this.$emit("playSong", song);
    },
     scrollHanle(evt) {
      console.log(evt)
    }
  },
  components: {
    songListPrev,
    youtubeSongs,
    vueCustomScrollbar
  }
};
</script>

<style>

</style>