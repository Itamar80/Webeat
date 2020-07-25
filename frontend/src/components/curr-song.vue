<template>
  <section class="curr-song flex justify-center align-center">
    <section class="song-controllers flex row justify-center align-center space-between">
      <youtube
      v-if="currStation"
        :video-id="videoId"
        :player-vars="playerVars"
        @playing="playing"
        @ended="ended"
        ref="youtube"
      ></youtube>
      <div class="flex row justify-center align-center space-between">
      <img v-if="currStation" @click="goToStation" :src="currStation.imgUrl" />
      <div v-if="currStation">
      <img class="gif" v-if="isPlaying" src="@/assets/sound-gif2.gif" />
      <img class="gif" v-else src="@/assets/preview.png" />
      </div>
      <div v-if="currStation" class="currPlaying">
        <h5>Now Playing:</h5>
        <p>{{currSongTitle}}</p>
      </div>
      <p v-else>
        No station chosen
      </p>
      </div>
      <div class=" controllers flex row justify-center align-center space-between">
      <div class="flex row justify-center align-center">
        <font-awesome-icon @click="toggleMute" :icon="volumeIcon" class="volume-icon control-icon" />
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
          @click="playOrPauseVideo(false,false)"
          icon="pause"
          size="lg"
          class="control-icon"
        />
        <font-awesome-icon
          v-else
          @click="playOrPauseVideo(true, false)"
          icon="play"
          size="lg"
          class="control-icon"
        />
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
          @input="changeSongTime()"
          @mousedown="playOrPauseVideo(false)"
          @mouseup="playOrPauseVideo(true)"
          @touchstart="playOrPauseVideo(false)"
          @touchend="playOrPauseVideo(true)"
          :value="songCurrTime"
          :max="songEndTime"
          id="progressBar"
          type="range"
        />
        {{ duration }}
      </span>
      </div>
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
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
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
library.add(faVolumeMute);

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
      isMuted: false,
      currSongCueTime: null
    };
  },
  computed: {
    videoId() {
      return this.currSong.youtubeId;
    },
    player() {
      return this.$refs.youtube.player;
    },
    currStation() {
      return this.$store.getters.currStation;
    },
    currSong() {
      return this.$store.getters.currSong;
    },
    currSongTitle(){
    return ( this.currSong.title.length>30)?this.currSong.title.substring(0,30)+'...':this.currSong.title
    },
    // isPlaying(){
    //   return this.$store.getters.isPlaying;
    // }
  },
  async created() {
    socket.on('joined new station', time =>{
      this.songCurrTime = time
    })
    socket.on("song changed", (song) => {
      console.log(song)
      this.$store.dispatch({ type: "setCurrSong", song });
    });
    socket.on("songStatus changed", (isPlaying) => {
      this.$store.commit({ type: "setSongStatus", isPlaying });
      this.playOrPauseVideo(isPlaying, true);
    });
    socket.on("update song time", (timestamp) => {
      this.updateSongTime(timestamp);
    });
  },
  methods: {
    async playOrPauseVideo(play, isFromSocket) {
      this.isPlaying = play;
      if (play) await this.player.playVideo();
      else await this.player.pauseVideo();
      if (isFromSocket) return;
      socket.emit("set songStatus", play);
      this.$store.commit({ type: "setSongStatus", isPlaying: play });
    },
    async setCurrSong(song) {
      socket.emit("set currSong", song);
      const newCurrSong = await this.$store.dispatch({
        type: "setCurrSong",
        song,
      });
    },
    async getSongEndTime() {
      return (this.songEndTime = await this.player.getDuration());
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
    changeVolume(event) {
      this.player.setVolume(event.target.value);
      this.changeVolumeIcon(event.target.value);
    },
    changeVolumeIcon(value) {
      if (value >= 60) this.volumeIcon = "volume-up";
      if (value <= 60) this.volumeIcon = "volume-down";
      if (value <= 20) this.volumeIcon = "volume-off";
      if (value <0) this.volumeIcon = "volume-mute";
    },
    toggleMute(){
      this.isMuted = !this.isMuted
      if(this.isMuted){
        this.player.mute()
      this.changeVolumeIcon(-1)
      } else{
        player.unMute()
      const elVolumeInput =  document.getElementById('volume')
      this.changeVolumeIcon(elVolumeInput.value)
      }
    },
    changeSongTime() {
      this.player.seekTo(event.target.value);
      socket.emit("song time changed", event.target.value);
    },
    updateSongTime(timestamp){
      console.log(timestamp)
      this.songCurrTime = timestamp
      this.player.seekTo(timestamp);
    },
    async playing() {
      this.isPlaying = true;
      this.duration = this.formatTime(await this.player.getDuration());
      this.timeId = setInterval(() => {
        this.player.getCurrentTime()
        .then((time) => {
          // socket.emit('songCurrTime', time)
          this.songCurrTime = time;
          this.time = this.formatTime(time + 1);
        });
      }, 1000);
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
    goToStation(){
      this.$router.push(`stations/details/${this.currStation._id}`)
    }
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

     