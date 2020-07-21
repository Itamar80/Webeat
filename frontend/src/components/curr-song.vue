<template>
  <section class="curr-song">
    <div class="top-section flex justify-center align-center space-between">
      <div class="flex col">
        <h1>{{station.name}}</h1>
        <span>Created By: {{station.createdBy.fullName}}</span>
        <span class="genre">{{station.genre.charAt(0).toUpperCase()+station.genre.slice(1)}}</span>
        <span>
          <font-awesome-icon
            icon="heart"
            size="lg"
            class="icon heart-icon"
            :class="{liked:isLiked}"
            @click.stop="toggleLike(station._id)"
          />
          {{station.likedByUsers.length}}
        </span>
        <span>
          <font-awesome-icon size="lg" :icon="['far', 'clock']" class="icon clock-icon" />
          {{station.songs.length}} tracks
        </span>
        <p>Now Playing: {{currSong.title}}</p>
      </div>
      <youtube
        :video-id="videoId"
        :player-vars="playerVars"
        @playing="playing"
        @ended="ended"
        ref="youtube"
      ></youtube>
    </div>
    <section class="song-controllers flex row justify-center align-center space-between">
      <img v-if="isPlaying" src="@/assets/sound-gif2.gif" />
        <img v-else src="@/assets/preview.png"/>
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
          @click="pauseVideo"
          icon="pause"
          size="lg"
          class="control-icon"
        />
        <font-awesome-icon v-else @click="playVideo" icon="play" size="lg" class="control-icon" />
        <font-awesome-icon
          @click="changeSong('nextSong')"
          icon="forward"
          size="lg"
          class="control-icon"
        />
      </div>
      <span class="flex row justify-center align-center">
        {{ time }}
        <input @input="changeSongTime" :value="songCurrTime" :max="songEndTime" id="progressBar" type="range" />
        {{ duration }}
      </span>
    </section>
  </section>
</template>

<script>
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

export default {
  name: "curr-song",
  props: {
    station: Object,
    currSong: Object,
    global: Boolean
  },
  data() {
    return {
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0
      },
      time: "00:00",
      duration: "00:00",
      timeId: null,
      isLiked: false,
      volumeIcon: "volume-up",
      isPlaying: true,
      songEndTime: 0,
      songCurrTime: 0
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
    
  },
  methods: {
    async getSongEndTime(){
     return this.songEndTime =  await this.player.getDuration()
    },
    async playVideo() {
      this.isPlaying = true;
      await this.player.playVideo();
      this.$emit('toggleGif', true)

    },
    async pauseVideo() {
      this.isPlaying = false;
      await this.player.pauseVideo();
      this.$emit('toggleGif', false)
    },
  async changeSong(type) {
     await this.$emit("changeSong", type, this.currSong);
      const songTime =  await this.getSongEndTime()
      this.duration = this.formatTime(songTime);
     
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
    changeSongTime(event){
      this.player.seekTo(event.target.value);
    },
   async playing() {
      // this.$emit('toggleGif', true)
      this.isPlaying =true
      this.duration = this.formatTime(await this.player.getDuration());
      this.timeId = setInterval(() => {
        this.player.getCurrentTime().then(time => {
          this.songCurrTime = time
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
    toggleLike(id) {
      this.isLiked = !this.isLiked;
      this.$emit("toggleLike", id, this.isLiked);
    }
  },
  async mounted() {
    this.duration = this.formatTime(await this.player.getDuration());
    this.getSongEndTime()
  },
  components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>

     