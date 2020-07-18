<template>
  <section>
    <div @click="playSong" class="youtube-song flex space-between align-center">
      <p>{{song.title}}</p>
      <img :src="song.imgUrl" />
      <button @click="deleteSong">delete</button>
    </div>
  </section>
</template>
 
<script>
export default {
  props: {
    song: Object
  },
  data() {
    return {};
  },
  methods: {
    deleteSong() {},
    playSong(){
      this.$emit('playSong', this.song)

    }
  }
};
</script>

<style>
</style>