<template>
  <div class="editor flex">
    <div :class="isSaved">
      <div class="chack-container flex align-center justify-center">
        <font-awesome-icon class="check-icon" icon="check-circle" />
      </div>
      <h3>Station saved successfully</h3>
      <div class="buttons flex align-center justify-center">
        <router-link to="/stations">Back to stations</router-link>
        <span @click="goToStation" to>Go to my new station</span>
      </div>
    </div>
    <!-- <div class="form-songs-container flex"> -->
    <section class="station-form flex align-center justify-center col">
      <h1>Create your station</h1>
      <form @submit.prevent="addStation" class="flex col">
        <label>
          <h3>Station Name:</h3>
          <input type="text" placeholder="Enter the station name" v-model="station.name" ref="name" />
        </label>
        <label>
          <h3>Station Description:</h3>
          <input type="text" placeholder="Enter the station description" v-model="station.desc" />
        </label>
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
          <input type="text" placeholder="Add song to the station" v-model="songToFindYoutube" />
          <button
            v-if="station.songs.length===0 || !station.songs.length"
            class="btn edit-sub-btn"
            @click.prevent="searchSongs"
          >Search song</button>
          <button
            v-else
            class="btn edit-sub-btn"
            @click.prevent="searchSongs"
          >{{station.songs.length}} Songs added</button>
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
        <div class="info flex col">
          <h1 v-if="station.name">{{station.name}}</h1>
          <h1 v-else>Station name</h1>
          <p v-if="station.desc">{{station.desc}}</p>
          <p v-else>Station Description</p>
          <span class="creator-info align-center" v-if="loggedInUser.fullName !== 'Guest'">
            Created By:
            <img class="creator-img" :src="loggedInUser.imgUrl" alt="creator img" />
            {{loggedInUser.fullName}}
          </span>
          <span class="creator-info align-center" v-else>
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
import { fontAwsomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle);

export default {
  data() {
    return {
      station: {
        name: "",
        desc: "",
        createdBy: null,
        genre: "",
        songs: [],
        imgUrl: "",
        likedByUsers: [],
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
          value: "latin",
          label: "Latin",
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
        {
          value: "classical",
          label: "Classical",
        },
        {
          value: "alternative",
          label: "Alternative",
        },
        {
          value: "folk",
          label: "Folk",
        },
        {
          value: "soul",
          label: "Soul",
        },
        {
          value: "blues",
          label: "Blues",
        },
        {
          value: "disco",
          label: "Disco",
        },
        {
          value: "metal",
          label: "Metal",
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
      isModalActive: false,
      newStationId: "",
    };
  },
  computed: {
    songList() {
      return this.$store.getters.songList;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    isSaved() {
      if (this.isModalActive) {
        return "save-modal active";
      } else {
        return "save-modal";
      }
    },
  },
  // watch:{},
  created() {
    this.station = stationService.getEmptyStation();
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    async addStation() {
      this.isModalActive = true;
      this.$store.commit({
        type: "updateGenresMap",
        genre: this.station.genre,
      });
      if (this.loggedInUser) {
        this.station.createdBy = this.loggedInUser;
      } else
        this.station.createdBy = {
          fullName: "Guest",
          imgUrl: "@/assets/default-guest.jpg",
        };
      const newStation = await this.$store.dispatch({
        type: "saveStation",
        station: this.station,
      });
      this.newStationId = newStation._id;
    },
    toggleModal() {
      this.isModalActive = !this.isModalActive;
      console.log("saved", this.isModalActive);
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
    goToStation() {
      this.$router.push(`/stations/details/${this.newStationId}`);
    },
    addSong(song) {
      this.station.songs.push(song);
      this.songToFindYoutube = "";
    },
    deleteSong(songId) {
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
    fontAwsomeIcon,
    songListEdit,
    youtubeSongs,
    songList,
  },
};
</script>