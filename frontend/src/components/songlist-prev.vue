<template>
  <section>
    <div @click="playSong" class="youtube-song flex space-between align-center">
      <section class="flex row align-center">
        <!-- <img :src="song.imgUrl" /> -->
        <div class="index-container flex align-center justify-center">
         <span class="index">{{index+1}}</span>
        </div>
        <p>{{song.title}}</p>
      </section>
      <div v-if="!edit" class="flex align-center">
        <font-awesome-icon  icon="sort" class="sort" />
        <div class="sound-gif" v-if="isPlaying">
        <img  class="sound-gif" v-if="!songPlaying" src="@/assets/preview.png"/>
        <img  class="sound-gif" v-else src="@/assets/sound-gif2.gif" />
        </div>
        <font-awesome-icon v-else icon="play" class="play" />
        <span class="delele-btn" @click.stop="deleteSong">x</span>
        <!-- <font-awesome-icon @click="deleteSong" icon="trash" class="icon delete" /> -->
      </div>
      <span class="delele-btn" v-else @click.stop="deleteSong">x</span>
    </div>
  </section>
</template>
 
<script>
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
library.add(faSort);
library.add(faPlay);
library.add(faTrash);
export default {
  props: {
    index: Number,
    song: Object,
    currSong: Object,
    edit: Boolean,

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
  computed:{
     songPlaying() {
      // console.log(this.$store.getters.isPlaying)
      return this.$store.getters.isPlaying;
    }
  },
  created() {
    this.checkIfPlaying();
    // console.log(this.songPlaying)
  },
  methods: {
    async playSong() {
      await this.$emit("playSong", this.song);
      this.checkIfPlaying();
    },
    deleteSong() {
      this.$emit('deleteSong',this.song._id);
    },
    checkIfPlaying() {
      this.isPlaying = this.song._id === this.currSong._id ? true : false;
    }
  },
  components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>