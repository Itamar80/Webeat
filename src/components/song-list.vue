<template>
  <section>
    <pre>
          {{songs}}
    </pre>
  </section>
</template>

<script>
export default {
  name: 'song-list',
    props:{
        songs:Array
    },
    data(){
        return{
            
        }
    },
    created(){
      this.start()
    },
    methods:{
      start(){
        this.$emit('setCurrSong', {song: 'song', title: 'omg'})

        }
      }
}
</script>

<style>

</style>