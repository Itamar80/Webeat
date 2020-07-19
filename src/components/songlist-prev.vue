<template>
  <section>
    <div @click="playSong" class="youtube-song flex space-between align-center">
     <section class="flex row align-center">
      <img :src="song.imgUrl" />
      <p>{{song.title}}</p>
     </section>
      <font-awesome-icon @click="deleteSong" icon="trash" size="lg" class="delete" />
    </div>
  </section>
</template>
 
<script>
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);
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
  },
   components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>