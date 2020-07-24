<template>
  <!-- <section class="song-list song-list-edit flex row"> -->
    <!-- <section class="flex col">
      <div class="flex row align-center">
        <input type="text" v-model="songToFindYoutube" />
        <button class="btn edit-sub-btn" @click.prevent="searchSongs">Search new songs</button>
      </div>
      <vue-custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
        <youtubeSongs @addSong="addSong" :songList="songList" />
      </vue-custom-scrollbar> 
    </section>-->
    <section class=" song-list song-list-edit flex col justify-center align-center ">
      <div class="flex row align-center space-between">
        <input type="text" v-model="songTofindStation" />
        <button class="btn edit-sub-btn" @click.prevent="searchInStation">Search in Station</button>
      </div>
      <div v-if="station.songs.length===0" class="songlist-filler">
          <p>No Songs Yet</p>
      </div>
      <section v-else class="songlist-container">
        <vue-custom-scrollbar suppressScrollX class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
          <ul class="clean-list">
            <li v-for="song in songs" :key="song._id">
              <songListPrev @deleteSong="deleteSong" :song="song" :edit="true" />
            </li>
          </ul>
        </vue-custom-scrollbar>
      </section>
    </section>
  <!-- </section> -->
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
  name: "songlis-edit",
  props: {
    station: Object
    // songList: Object
  },
  data() {
    return {
      songs: this.station.songs,
      songToFindYoutube: "",
      songTofindStation: "",
      settings: { 
        maxScrollbarLength: 60,
        suppressScrollX: true
      },
    };
  },
  computed: {},
  watch: {
    songTofindStation: function(input) {
      if (input === "") this.songs = this.station.songs;
    }
  },
  methods: {
    deleteSong(songId){
      this.$emit('deleteSong', songId)
    },
    searchInStation() {
      this.songs = this.station.songs.filter(song =>
        song.title.includes(this.songTofindStation)
      );
    },
    scrollHanle(evt) {},
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