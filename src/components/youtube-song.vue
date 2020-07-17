<template>
  <div>
      <p>{{song.snippet.title}}</p>
      <img :src="song.snippet.thumbnails.default.url"/>
    <!-- <pre>
        {{song}}
    </pre> -->
  </div>
</template>

<script>
export default {
  props: {
    song: Object
  }
};
</script>

<style>
</style>