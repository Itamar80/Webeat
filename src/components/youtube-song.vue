<template>
  <div class="youtube-song flex space-between align-center">
     <section class="flex row align-center">
     <img :src="song.snippet.thumbnails.default.url"/>
      <p>{{song.snippet.title}}</p>
     </section>
      <font-awesome-icon @click.stop="addSong(song)" icon="plus" size="lg" class="icon plus" />
  </div>
</template>

<script>
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
export default {
  props: {
    song: Object
  }, 
  methods:{
      addSong(song){
          var songToAdd = {
            youtubeId: song.id.videoId,
            title: song.snippet.title,
            //make id
            imgUrl: song.snippet.thumbnails.default.url
          }
          this.$emit('addSong', songToAdd)
      }
  }
};
</script>

<style>
</style>