<template>
  <div class="youtube-song flex space-between align-center">
      <p>{{song.snippet.title}}</p>
      <img :src="song.snippet.thumbnails.default.url"/>
      <button @click="addSong(song)">+</button>
    <!-- <pre>
        {{song}}
    </pre> -->
  </div>
</template>

<script>
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