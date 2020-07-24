<template>
  <div class="editor flex">
    <!-- <div class="form-songs-container flex"> -->
    <section class="station-form flex align-center justify-center col">
      <h1>Create your station</h1>
      <form @submit="addStation" class="flex col">
        <label>
          <h3>Station name:</h3>
          <input type="text" placeholder="Enter the station name" v-model="station.name" ref="name" />
        </label>
        <!-- <label>
          <h3>Created By:</h3>
          <input
            type="text"
            placeholder="Enter your name"
            v-model="station.createdBy.fullName"
          />
        </label>-->
        <input @change="onUploadImg" type="file" name="file" id="file" class="inputfile" />
        <label for="file">Upload Station Image</label>
        <h3>Genre:</h3>
        <el-select v-model="station.genre" placeholder="Select a genre">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <section class="flex col">
          <!-- <div class="flex row align-center"> -->
          <input type="text" placeholder="Add song to the station" v-model="songToFindYoutube" />
          <button class="btn edit-sub-btn" @click.prevent="searchSongs">Search song</button>
          <!-- </div> -->
          <vue-custom-scrollbar
            suppressScrollX
            class="scroll-area"
            :settings="settings"
            @ps-scroll-y="scrollHanle"
          >
            <youtubeSongs @addSong="addSong" :songList="songList" />
          </vue-custom-scrollbar>
        </section>
        <button type="submit" class="btn submit-btn">Add station</button>
      </form>
    </section>
    <div class="details-section flex col">
      <div class="station-details flex space-around">
        <div class="flex col">
          <h1 v-if="station.name">{{station.name}}</h1>
          <h1 v-else>Station name</h1>
          <span class="creator-info  align-center" v-if="loggedInUser">
            Created By:
            <img class="creator-img" :src="loggedInUser.imgUrl" alt />
            {{loggedInUser.fullName}}
          </span>
          <span class="creator-info  align-center" v-else>
            Created By:
            <img class="creator-img" src="@/assets/default-guest.jpg" alt />
            Guest
          </span>
          <span v-if="station.genre" class="genre capitalize">{{station.genre}}</span>
          <span v-else class="genre">Genre</span>
          <span v-if="station.songs.length">
            <font-awesome-icon size="lg" :icon="['far', 'clock']" class="icon clock-icon" />
            {{station.songs.length}} tracks
          </span>
        </div>
        <img v-if="station.imgUrl" width="200" :src="img" />
        <img v-else width="200" src="@/assets/defualt-img-cover.jpg" />
      </div>
      <section class="station-songs">
        <song-list-edit @deleteSong="deleteSong" :station="station" />
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
        createdBy: null,
        genre: "",
        songs: [],
        imgUrl: "",
      },
      options: [
        {
          value: "hiphop",
          label: "Hip-Hop",
        },
        {
          value: "arabic",
          label: "Arabic",
        },
        {
          value: "easy",
          label: "Easy listening",
        },
        {
          value: "electronic",
          label: "Electronic",
        },
        {
          value: "country",
          label: "Country",
        },
        {
          value: "flamenco",
          label: "Flamenco",
        },
        {
          value: "jazz",
          label: "Jazz",
        },
        {
          value: "rock",
          label: "Rock",
        },
        {
          value: "pop",
          label: "Pop",
        },
      ],
      tagToAdd: "",
      img: "",
      songToFindYoutube: "",
      inputVisible: false,
      inputValue: "",
      settings: {
        maxScrollbarLength: 60,
        suppressScrollX: true,
      },
    };
  },
  computed: {
    songList() {
      // console.log('indetails',this.$store.getters.songList);
      return this.$store.getters.songList;
    },
    loggedInUser() {
      console.log("logged in is", this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  // watch:{},
  created() {
    this.station = stationService.getEmptyStation();
    // this.genresStationsMap = this.genresMap
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    addTag() {
      this.station.tags.push(this.tagToAdd);
      this.tagToAdd = "";
    },
    addStation() {
      this.$store.commit({
        type: "updateGenresMap",
        genre: this.station.genre,
      });
      if (this.loggedInUser) {
        this.station.createdBy = this.loggedInUser;
      } else this.station.createdBy = { fullName: "Guest" };
      this.$store.dispatch({ type: "saveStation", station: this.station });
      this.$router.push(`/`);
    },
    async onUploadImg(ev) {
      const res = await uploadImg(ev);
      this.img = res.url;
      this.station.imgUrl = this.img;
    },
    async searchSongs() {
      await this.$store.dispatch({
        type: "searchSong",
        songStr: this.songToFindYoutube,
      });
    },
    addSong(song) {
      this.station.songs.push(song);
      this.songToFindYoutube = "";
      console.log(song);
    },
    deleteSong(songId) {
      console.log(songId);
      var idx = this.station.songs.findIndex((song) => song._id === songId);
      this.station.songs.splice(idx, 1);
    },
    focusInput() {
      this.$refs.name.focus();
    },
    handleClose(tag) {
      this.station.tags.splice(this.station.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
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
    scrollHanle(evt) {},
  },
  components: {
    vueCustomScrollbar,

    songListEdit,
    youtubeSongs,
    songList,
  },
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