<template>
  <section class="curr-song">
    <div class="flex space-around">
      <h1>{{station.name}}</h1>
      <div class="iframe-container">
        <youtube
          :video-id="videoId"
          :player-vars="playerVars"
          @playing="playing"
          @ended="ended"
          ref="youtube"
        ></youtube>
      </div>
    </div>
    <section class="song-controllers flex row justify-center align-center">
      <!-- <input id="progressBar" type="range" /> -->
      <span>{{ time }}/{{ duration }}</span>
      <font-awesome-icon
        @click="changeSong('prevSong')"
        icon="backward"
        size="lg"
        class="control-icon"
      />
      <font-awesome-icon @click="playVideo" icon="play" size="lg" class="control-icon" />
      <font-awesome-icon @click="pauseVideo" icon="pause" size="lg" class="control-icon" />
      <font-awesome-icon
        @click="changeSong('nextSong')"
        icon="forward"
        size="lg"
        class="control-icon"
      />
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
    station: Object,
    currSong: Object
  },
  data() {
    return {
      playerVars: {
        // autoplay: 1,
        // controls: 0,
        modestbranding: 1,
        showinfo: 0
      },
      time: "00:00",
      duration: "00:00",
      timeId: null
    };
  },
  mounted() {},
  computed: {
    videoId() {
      return this.currSong.youtubeId;
    },
    player() {
      console.log(this.$refs.youtube.player);
      return this.$refs.youtube.player;
    }
  },
  methods: {
    async playVideo() {
      await this.player.playVideo();
    },
    async pauseVideo() {
      await this.player.pauseVideo();
    },
    changeSong(type) {
      this.$emit("changeSong", type, this.currSong);
    },
    ended() {
      this.changeSong("nextSong");
    },
      async showDuration() {
        return await this.player.getDuration();
      },

      playing() {
        this.timeId = setInterval(() => {
          this.player.getCurrentTime().then(time => {
            this.time = this.formatTime(time + 1);
          });
        }, 100);
      },
      formatTime(time) {
        time = Math.round(time);
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        return minutes + ":" + seconds;
      },
      ended() {
        this.time = "00:00";
        clearInterval(this.timeId);
      }
    },
    async mounted() {
      this.duration = this.formatTime(await this.player.getDuration());
    },
    components: {
      fontAwsomeIcon
    }
  
};
</script>

<style>
</style>

     