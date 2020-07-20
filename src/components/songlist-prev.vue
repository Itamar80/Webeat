<template>
  <section>
    <div @click="playSong" class="youtube-song flex space-between align-center">
      <section class="flex row align-center">
        <img :src="song.imgUrl" />
        <p>{{song.title}}</p>
      </section>
      <div class="flex align-center">
        <img class="sound-gif" v-if="isPlaying" src="@/assets/sound-gif2.gif" />
        <font-awesome-icon v-else icon="play" class="play" />
        <span @click="deleteSong">x</span>
        <!-- <font-awesome-icon @click="deleteSong" icon="trash" class="icon delete" /> -->
      </div>
    </div>
  </section>
</template>
 
<script>
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlay);
library.add(faTrash);
export default {
  props: {
    song: Object,
    currSong: Object
  },
  data() {
    return {
      isPlaying: false
    };
  },
  watch: {
    currSong: function(newVal, oldVal) {
      this.checkIfPlaying();
    }
  },
  created() {
      this.checkIfPlaying();
  },
  methods: {
    deleteSong() {},
    async playSong() {
      await this.$emit("playSong", this.song);
      this.checkIfPlaying();
    },
    checkIfPlaying() {
      this.isPlaying = this.song === this.currSong ? true : false;
    }
  },
  components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>