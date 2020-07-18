<template>
  <section class="curr-song">
    <div class="iframe-container">
      <youtube :video-id="videoId" :player-vars="playerVars"  @ended="ended" ref="youtube"></youtube>
    </div>
    <section class="song-controllers flex row justify-center align-center">
      <font-awesome-icon @click="changeSong('prevSong')" icon="backward" size="lg" class="control-icon" />
      <font-awesome-icon @click="playVideo" icon="play" size="lg" class="control-icon" />
      <font-awesome-icon @click="pauseVideo" icon="pause" size="lg" class="control-icon" />
      <font-awesome-icon @click="changeSong('nextSong')" icon="forward" size="lg" class="control-icon" />
    </section>
  </section>
</template>

<script>
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faForward);
library.add(faPause);
library.add(faBackward);

export default {
  name: "curr-song",
  props: {
    currSong: Object
  },
  data() {
    return {
       playerVars: {
        autoplay: 1,
        // controls: 0,
        modestbranding:1,
        showinfo: 0
      }
    };
  },
  mounted() {
  },
  computed: {
    videoId() {
      return this.currSong.youtubeId;
    },
    player() {
      return this.$refs.youtube.player;
    }
    // videoSrc() {
    //   // return `//www.youtube.com/embed/${this.currSong.youtubeId}?enablejsapi=1`
    //   return `//www.youtube.com/embed/${this.currSong.youtubeId}?enablejsapi=1;&autoplay=1`;
    // },
  },
  methods: {
    async playVideo() {
      await this.player.playVideo();
    },
    async pauseVideo() {
      await this.player.pauseVideo();
    },
    changeSong(type){
      this.$emit('changeSong', type, this.currSong)
    },
    ended(){
      this.changeSong('nextSong')
    }
   
  },
  components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>
