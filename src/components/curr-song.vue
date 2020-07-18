<template>
  <section class="curr-song">
    <iframe id="youtube-video" width="450" height="300" :src="videoSrc" frameborder="0" allowfullscreen></iframe>
    <section class="song-controllers flex row justify-center align-center">
      <font-awesome-icon icon="backward" size="lg" class="control-icon" />
      <font-awesome-icon icon="play" size="lg" class="control-icon" />
      <font-awesome-icon icon="pause" size="lg" class="control-icon" />
      <font-awesome-icon icon="forward" size="lg" class="control-icon" />
    </section>
  </section>
</template>

<script>
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faForward);
library.add(faPause);
library.add(faBackward);

export default {
  name: "curr-song",
  props: {
    currSong: Object
  },
  created() {
    // var tag = document.createElement("script");
    // tag.src = "https://www.youtube.com/player_api";
    // var firstScriptTag = document.getElementsByTagName("script")[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // var player;
    // function onYouTubeIframeAPIReady() {
    //   player = new YT.Player("player", {
    //     height: "500",
    //     width: "640",
    //     videoId: currSong.youtubeId,
    //     events: {
    //       onReady: onPlayerReady,
    //       onStateChange: onPlayerStateChange
    //     }
    //   });
    // }
  },
  computed: {
    videoSrc() {
      // return `//www.youtube.com/embed/${this.currSong.youtubeId}?enablejsapi=1`
      return `//www.youtube.com/embed/${this.currSong.youtubeId}?enablejsapi=1`
    }
  },
  components: {
    fontAwsomeIcon
  }
};
</script>

<style>
</style>

    //   // 2. This code loads the IFrame Player API code asynchronously.
    //   var tag = document.createElement('script');

    //   tag.src = "https://www.youtube.com/iframe_api";
    //   var firstScriptTag = document.getElementsByTagName('script')[0];
    //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //   // 3. This function creates an <iframe> (and YouTube player)
    //   //    after the API code downloads.
    //   var player;
    //   function onYouTubeIframeAPIReady() {
    //     player = new YT.Player('player', {
    //       height: '390',
    //       width: '640',
    //       videoId: 'M7lc1UVf-VE',
    //       events: {
    //         'onReady': onPlayerReady,
    //         'onStateChange': onPlayerStateChange
    //       }
    //     });
    //   }

    //   // 4. The API will call this function when the video player is ready.
    //   function onPlayerReady(event) {
    //     event.target.playVideo();
    //   }

    //   // 5. The API calls this function when the player's state changes.
    //   //    The function indicates that when playing a video (state=1),
    //   //    the player should play for six seconds and then stop.
    //   var done = false;
    //   function onPlayerStateChange(event) {
    //     if (event.data == YT.PlayerState.PLAYING && !done) {
    //       setTimeout(stopVideo, 6000);
    //       done = true;
    //     }
    //   }
    //   function stopVideo() {
    //     player.stopVideo();
    //   }
    // </script>