<template>
  <section v-if="currStation" class="curr-song flex justify-center align-center">
    <section class="song-controllers flex row justify-center align-center space-between">
      <youtube
        :video-id="videoId"
        :player-vars="playerVars"
        @playing="playing"
        @ended="ended"
        ref="youtube"
      ></youtube>
      <img v-if="isPlaying" src="@/assets/sound-gif2.gif" />
      <img v-else src="@/assets/preview.png" />
      <div class="currPlaying">
        <h5>Now Playing:</h5>
        <p>{{currSong.title}}</p>
      </div>
      <div class="flex row justify-center align-center">
        <font-awesome-icon :icon="volumeIcon" class="control-icon" />
        <input id="volume" @input="changeVolume" value="100" type="range" />
      </div>
      <div class="flex row justify-center align-center">
        <font-awesome-icon
          @click="changeSong('prevSong')"
          icon="backward"
          size="lg"
          class="control-icon"
        />
        <font-awesome-icon
          v-if="isPlaying"
          @click="pauseVideo(false)"
          icon="pause"
          size="lg"
          class="control-icon"
        />
        <font-awesome-icon v-else @click="playVideo(false)" icon="play" size="lg" class="control-icon" />
        <font-awesome-icon
          @click="changeSong('nextSong')"
          icon="forward"
          size="lg"
          class="control-icon"
        />
      </div>
      <span class="flex row justify-center align-center">
        {{ time }}
        <input
          @change="changeSongTime"
          :value="songCurrTime"
          :max="songEndTime"
          id="progressBar"
          type="range"
        />
        {{ duration }}
      </span>
    </section>
  </section>
</template>

<script>
//FONTAWOSME
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

library.add(faClock);
library.add(faHeart);
library.add(faPlay);
library.add(faForward);
library.add(faPause);
library.add(faBackward);
library.add(faVolumeOff);
library.add(faVolumeDown);
library.add(faVolumeUp);

//IMPORTS
import socket from "@/services/socket-service.js";
import { stationService } from "@/services/station-service.js";

export default {
  name: "curr-song",
  data() {
    return {
      // currStation: null,
      // currSong: null,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0,
      },
      time: "00:00",
      duration: "00:00",
      timeId: null,
      volumeIcon: "volume-up",
      isPlaying: true,
      songEndTime: 0,
      songCurrTime: 0,
    };
  },
  computed: {
    videoId() {
      return this.currSong.youtubeId;
    },
    player() {
      console.log(this.$refs.youtube.player);
      return this.$refs.youtube.player;
    },
    currStation() {
      return this.$store.getters.currStation;
    },
    currSong() {
      return this.$store.getters.currSong;
    },
    // isPlaying(){
    //   return this.$store.getters.isPlaying;
    // }
  },
  async created() {
    socket.on('song changed', (song) => {
      this.$store.dispatch({ type: 'setCurrSong', song });
    });
    socket.on('songStatus changed', (isPlaying) => {
      console.log(isPlaying)
      this.$store.commit({ type: 'setSongStatus', isPlaying });
      (isPlaying)? this.playVideo(true): this.pauseVideo(true);

    });
  }, 
  methods: {
    async getSongEndTime() {
      return (this.songEndTime = await this.player.getDuration());
    },
    async playVideo(isFromSocket) {
      this.isPlaying = true
      await this.player.playVideo();
      if (isFromSocket) return 
      socket.emit("set songStatus", true);
      this.$store.commit({ type: "setSongStatus", isPlaying: true });
    },
    async pauseVideo(isFromSocket) {
      this.isPlaying = false
      await this.player.pauseVideo();
       if (isFromSocket) return 
      socket.emit("set songStatus", false);
      this.$store.commit({ type: "setSongStatus", isPlaying: false });
    },
    async changeSong(type) {
      var idx = this.currStation.songs.findIndex(
        (song) => song._id === this.currSong._id
      );
      if (type === "nextSong") {
        if (idx + 1 >= this.currStation.songs.length) {
          idx = -1;
        }
        this.setCurrSong(this.currStation.songs[idx + 1]);
      } else {
        if (idx - 1 < 0) {
          return;
        }
        this.setCurrSong(this.currStation.songs[idx - 1]);
      }
      const songTime = await this.getSongEndTime();
      this.duration = this.formatTime(songTime);
    },
    async setCurrSong(song) {
      socket.emit("set currSong", song);
      const newCurrSong = await this.$store.dispatch({
        type: "setCurrSong",
        song,
      });
    },
    changeVolume(event) {
      this.player.setVolume(event.target.value);
      this.changeVolumeIcon(event.target.value);
    },
    changeVolumeIcon(value) {
      console.log(value);
      if (value >= 60) this.volumeIcon = "volume-up";
      if (value <= 60) this.volumeIcon = "volume-down";
      if (value <= 20) this.volumeIcon = "volume-off";
    },
    changeSongTime(event) {
      // if (this.player.playing){

      // }
      this.player.seekTo(event.target.value);
    },
    async playing() {
      this.isPlaying = true;
      this.duration = this.formatTime(await this.player.getDuration());
      this.timeId = setInterval(() => {
        this.player.getCurrentTime().then((time) => {
          this.songCurrTime = time;
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
      this.changeSong("nextSong");
      this.time = "00:00";
      clearInterval(this.timeId);
    },
  },
  async mounted() {
    this.duration = this.formatTime(await this.player.getDuration());
    this.getSongEndTime();
  },
  components: {
    fontAwsomeIcon,
  },
};
</script>

<style>
</style>

     