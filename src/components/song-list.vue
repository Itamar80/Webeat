<template>
  <section class="song-list">
    <section class="song-search flex space-between align-center">
      <div class="flex row align-center">
        <input v-if="addSong" type="text" v-model="songToFindYoutube" />
        <button
          v-if="addSong"
          class="btn edit-sub-btn"
          @click.prevent="searchSongs"
        >Search new songs</button>
        <input v-if="!addSong" type="text" v-model="songTofindStation" />
        <button
          v-if="!addSong"
          class="btn edit-sub-btn"
          @click.prevent="searchInStation"
        >Search in Station</button>
      </div>
      <font-awesome-icon @click="addSong=!addSong" :icon="toggleAdd" size="lg" class="icon toggle-songs" />
      <!-- <button class="add-btn" @click="addSong=!addSong">{{toggleAdd}}</button> -->
    </section>
    <vue-custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
      <section v-if="!addSong" class="songlist-container">
        <ul class="clean-list">
          <li v-for="song in songs" :key="song._id">
            <songListPrev @playSong="playSong" :song="song" />
          </li>
        </ul>
      </section>
      <youtubeSongs v-if="addSong" @addSong="addSong" :songList="songList" />
    </vue-custom-scrollbar>
  </section>
</template>
 
<script>
import songListPrev from "../components/songlist-prev.vue";
import youtubeSongs from "../components/youtube-songs.vue";
import vueCustomScrollbar from "vue-custom-scrollbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);
library.add(faPlus);

export default {
  props: {
    station: Object,
    songList: Object
  },
  data() {
    return {
      songs: this.station.songs,
      songToFindYoutube: "",
      songTofindStation: "",
      settings: {
        maxScrollbarLength: 60
      },
      addSong: false
    };
  },
  computed: {
    toggleAdd() {
      return this.addSong ? "times" : "plus";
    }
  },
  watch: {
    songTofindStation: function(input) {
      if (input === "") this.songs = this.station.songs;
    }
  },
  methods: {
    searchSongs() {
      console.log(this.songToFindYoutube);
      this.$emit("searchSongs", this.songToFindYoutube);
    },
    searchInStation() {
      this.songs = this.station.songs.filter(song =>
        song.title.includes(this.songTofindStation)
      );
    },
    addSong(song) {
      this.$emit("addSong", song);
      this.songToFindYoutube = "";
    },
    playSong(song) {
      this.$emit("playSong", song);
    },
    scrollHanle(evt) {}
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