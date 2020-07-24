<template>
  <section class="song-list">
    <section class="song-search flex space-between align-center">
      <div class="flex row align-center">
        <input v-if="isAddSong" type="text" v-model="songToFindYoutube" />
        <button
          v-if="isAddSong"
          class="btn edit-sub-btn"
          @click.prevent="searchSongs"
        >Search new songs</button>
        <input v-if="!isAddSong" type="text" v-model="songTofindStation" class="input" />
        <button
          v-if="!isAddSong"
          class="btn edit-sub-btn"
          @click.prevent="searchInStation"
        >Search in Station</button>
      </div>
      <font-awesome-icon
        @click="isAddSong=!isAddSong"
        :icon="toggleAdd"
        size="lg"
        class="icon toggle-songs"
      />
      <!-- <button class="add-btn" @click="addSong=!addSong">{{toggleAdd}}</button> -->
    </section>
    <vue-custom-scrollbar
      suppressScrollX
      class="scroll-area"
      :settings="settings"
      @ps-scroll-y="scrollHanle"
    >
      <section v-if="!isAddSong" class="songlist-container">
        <div>
          <div class="simple-page">
            <Container
              @drop="onDrop"
              :get-ghost-parent="getGhostParent"
              :remove-on-drop-out="true"
              @drop-ready="onDropReady"
            >
              <Draggable v-for="(song, index) in station.songs" :key="song._id">
                <div class="draggable-item">
                  <songListPrev
                    :index="index"
                    :currSong="currSong"
                    @deleteSong="deleteSong"
                    @playSong="playSong"
                    :song="song"
                  />
                </div>
              </Draggable>
            </Container>
          </div>
        </div>

        <!-- <ul class="clean-list">
          <li v-for="(song, index) in songs" :key="song._id">
            <songListPrev :index="index"  :currSong="currSong" @deleteSong="deleteSong" @playSong="playSong" :song="song" />
          </li>
        </ul>-->
      </section>
      <youtubeSongs v-else @addSong="addSong" :songList="songList" />
    </vue-custom-scrollbar>
  </section>
</template>
 
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../utils/helpers";
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
    currSong: Object,
    songList: Object,
    isPlaying: Boolean,
  },
  data() {
    return {
      // songs: this.station.songs,
      songToFindYoutube: "",
      songTofindStation: "",
      settings: {
        maxScrollbarLength: 60,
        suppressScrollX: true,
      },
      isAddSong: false,
      // youtubeSongsToRender: this.songList
    };
  },
  computed: {
    toggleAdd() {
      return this.isAddSong ? "times" : "plus";
    },
  },
  watch: {
    songTofindStation: function (input) {
      if (input === "") this.songs = this.station.songs;
    },
    songToFindYoutube: function (input) {
      if (input === "") this.$store.commit("clearSongList");
    },
  },
  methods: {
    searchSongs() {
      console.log(this.songToFindYoutube);
      this.$emit("searchSongs", this.songToFindYoutube);
    },
    searchInStation() {
      this.songs = this.station.songs.filter((song) =>
        song.title.includes(this.songTofindStation)
      );
    },
    addSong(song) {
      // console.log('songList: ', song)
      this.$emit("addSong", song);
      this.songToFindYoutube = "";
      this.isAddSong = false;
    },
    deleteSong(songId) {
      this.$emit("deleteSong", songId);
    },
    playSong(song) {
      this.$emit("playSong", song);
    },
    scrollHanle(evt) {},
    onDrop (dropResult) {
      let songsToDrag =  JSON.parse(JSON.stringify(this.station.songs))
    songsToDrag = applyDrag(songsToDrag, dropResult)
     this.$emit('updateSongList', songsToDrag)
    },
    getGhostParent(){
      return document.body;
    },
    onDropReady(dropResult){
      console.log('drop ready', dropResult);
    }
  },
  components: {
    songListPrev,
    youtubeSongs,
    vueCustomScrollbar,
    Container,
    Draggable,
  },
};
</script>

<style>
</style>