<template>
  <div class="editor flex">
    <!-- <div class="form-songs-container flex"> -->
    <section class="station-form flex justify-center align-center">
      <form @submit="addStation" class="flex col flex-start">
        <label>
          Station name:
          <input
            type="text"
            placeholder="Enter the station name"
            v-model="station.name"
            ref="name"
          />
        </label>
        <!-- <label>
          Created By:
          <input
            type="text"
            placeholder="Enter your name"
            v-model="station.name"
            ref="name"
          />
        </label> -->
        <label>
          Station Image:
          <input type="file" @change="onUploadImg" />
        </label>
        Genre:
        <select name="genre" value="genre" v-model="station.genre">
          <option value="hiphop">Hip-hop</option>
          <option value="arabic">Arabic</option>
          <option value="easy">Easy listening</option>
          <option value="electronic">Electronic</option>
          <option value="country">Country</option>
          <option value="flamenco">Flamenco</option>
          <option value="jazz">Jazz</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
        </select>
        <section class="flex col">
          <div class="flex row align-center">
            <input type="text" v-model="songToFindYoutube" />
            <button class="btn edit-sub-btn" @click.prevent="searchSongs">Search song</button>
          </div>
          <vue-custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
            <youtubeSongs @addSong="addSong" :songList="songList" />
          </vue-custom-scrollbar>
        </section>

        <button type="submit" class="btn submit-btn">Add station</button>
      </form>
    </section>
    <div class="preview flex col">
      <div class="station-details flex space-around">
        <div class="flex col">
          <h1 v-if="station.name">{{station.name}}</h1>
          <h1 v-else>Name</h1>
          <span>Created By: {{station.createdBy.fullName}}</span>
          <span
            v-if="station.genre"
            class="genre"
          >{{station.genre.charAt(0).toUpperCase()+station.genre.slice(1)}}</span>
          <span v-else class="genre">Genre</span>
          <span>
            <font-awesome-icon size="lg" :icon="['far', 'clock']" class="icon clock-icon" />
            {{station.songs.length}} tracks
          </span>
        </div>
        <img v-if="station.imgUrl" width="200" :src="img" />
        <img v-else width="200" src="@/assets/defualt-img-cover.jpg" />
      </div>
      <section class="station-songs">
      <song-list-edit :station="station"/>
      </section>
    </div>
  </div>
</template>

<script>
import { songService } from "../services/song-service.js";
import { stationService } from "../services/station-service.js";
import { uploadImg } from "@/services/imgUpload.service.js";
import vueCustomScrollbar from "vue-custom-scrollbar";
import songListEdit from "../components/song-list-for-edit.vue";
import songList from "../components/song-list.vue";
import youtubeSongs from "../components/youtube-songs.vue";

export default {
  data() {
    return {
      station: {
        name: "",
        genre: "",
        songs: [],
        imgUrl: ""
      },
      tagToAdd: "",
      img: "",
      songToFindYoutube: "",
      // dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: "",
      settings: {
        maxScrollbarLength: 60
      }
    };
  },
  computed: {
    songList() {
      // console.log('indetails',this.$store.getters.songList);
      return this.$store.getters.songList;
    }
  },

  created() {
    this.station = stationService.getEmptyStation();
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    //add songs
    addTag() {
      this.station.tags.push(this.tagToAdd);
      this.tagToAdd = "";
    },
    addStation() {
      console.log(this.station);
      this.$store.dispatch({ type: "saveStation", station: this.station });
      this.$router.push("/stations");
    },
    async onUploadImg(ev) {
      const res = await uploadImg(ev);
      this.img = res.url;
      this.station.imgUrl = this.img;
    },
    async searchSongs() {
      await this.$store.dispatch({
        type: "searchSong",
        songStr: this.songToFind
      });
    },
    addSong(song) {
      this.station.songs.push(song);
      this.songToFindYoutube = "";
    },
    focusInput() {
      this.$refs.name.focus();
    },
    handleClose(tag) {
      this.station.tags.splice(this.station.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.station.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    scrollHanle(evt) {}
  },
  components: {
    vueCustomScrollbar,

    songListEdit,
    youtubeSongs,
    songList
  }
};
</script>
// function getEmptyStation() {
//     return {
//         name: '',
//         imgUrl: '',
//         tags: [],
//         createdAt: Date.now(),
//         createdBy: {},
//         likedByUsers: [],
//         songs: []

//     }
// }
          // <div>
          //   <label for=''>
          //   Add tags:
          //   <el-tag
          //     class='tag'
          //     :key='tag'
          //     v-for='tag in station.tags'
          //     closable
          //     :disable-transitions='false'
          //     @close='handleClose(tag)'
          //   >{{tag}}</el-tag>
          //   <el-input
          //     class='input-new-tag'
          //     v-if='inputVisible'
          //     v-model="inputValue"
          //     ref="saveTagInput"
          //     size="mini"
          //     @blur="handleInputConfirm"
          //   ></el-input>
          //   <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          //   <button @click="handleInputConfirm">Add tag</button>
          //   </label>
          // </div>
           <!-- Add tags:
          <input type="text" placeholder="Enter the station tags" v-model="tagToAdd" />
          {{station.tags}}-->
              <!-- @keyup.enter.native.stop="handleInputConfirm" -->

          <!-- <button class="btn edit-sub-btn" @click.prevent="addTag">Add tag</button> -->