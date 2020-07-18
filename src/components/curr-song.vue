<template>
  <section class="curr-song">
    <div class="iframe-container">
      <!-- <div id="ytplayer"></div> -->

      <!-- <iframe
        id="player"
        width="450"
        height="300"
        :src="videoSrc"
        frameborder="0"
        allowfullscreen
         
      ></iframe>-->
      <!-- <youtube :video-id="videoId"></youtube> -->

      <youtube :video-id="videoId" ref="youtube"></youtube>
    </div>
    <section class="song-controllers flex row justify-center align-center">
      <font-awesome-icon icon="backward" size="lg" class="control-icon" />
      <font-awesome-icon @click="playVideo" icon="play" size="lg" class="control-icon" />
      <font-awesome-icon icon="pause" size="lg" class="control-icon" />
      <font-awesome-icon icon="forward" size="lg" class="control-icon" />
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
      // videoId: this.currSong.youtubeId
    };
  },
  created() {},
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
    }
  },
  components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>
