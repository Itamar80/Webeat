<template>
  <section>
    <input type="text" v-model="songToFind" @input="searchSongs" />
    <section v-if="!songList" class="songlist-container">
      <ul class="clean-list">
        <li v-for="song in songs" :key="song._id">
          <songListPrev :song="song" />
        </li>
      </ul>
    </section>
    <youtubeSongs v-else  :songList="songList"/>
  </section>
</template>
 
<script>
import songListPrev from "../components/songlist-prev.vue";
import youtubeSongs from "../components/youtube-songs.vue";

export default {
  props: {
    songs: Array,
    songList : Object
  },
  data() {
    return {
      songToFind: ''
    };
  },
  methods: {
    searchSongs(){
      // console.log(this.songToFind);
      if(this.songToFind){
        this.$emit('searchSongs', this.songToFind)
      }else{
        this.$emit('toggleList')
      }
    },
     start(){
        this.$emit('setCurrSong', {song: 'song', title: 'omg'})

        }
  },
  components: {
    songListPrev,
    youtubeSongs
  }
};
</script>

<style>
</style>