<template>
  <div class="station-edit container">
    <h1>This is the station edit page</h1>
    <div class="form-songs-container space-between flex">
      <section class="station-form">
        <form @submit="addStation" class="flex col align-center">
          Station name:
          <input
            type="text"
            placeholder="Enter the station name"
            v-model="station.name"
            ref="name"
          />
          <img width="200" :src="img" />
          <label>
            Station Image:
            <input type="file" @change="onUploadImg" />
          </label>
          <!-- Add tags:
          <input type="text" placeholder="Enter the station tags" v-model="tagToAdd" />
          {{station.tags}}-->
          <div>
            <el-tag
              class="tag"
              :key="tag"
              v-for="tag in station.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input 
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>

          <!-- <button class="btn edit-sub-btn" @click.prevent="addTag">Add tag</button> -->
          <h3>Add song:</h3>Search songs:
          <input type="text" v-model="songToFind" />
          <button class="btn edit-sub-btn" @click.prevent="searchSongs">Search songs</button>
          <button class="btn submit-btn">Add station</button>
        </form>
        <youtubeSongs v-if="songList" @addSong="addSong" :songList="songList" />
      </section>
      <section class="station-songs">
        <h2>Station songs</h2>
        <section class="songlist-container">
          <ul class="station-songs clean-list">
            <li v-for="song in station.songs" :key="song._id">
              <songListPrev :song="song" />
            </li>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { stationService } from "../services/station-service.js";
import { uploadImg } from "@/services/imgUpload.service.js";
import youtubeSongs from "../components/youtube-songs.vue";
import songListPrev from "../components/songlist-prev.vue";

export default {
  data() {
    return {
      station: {
        name: null,
        tags: [],
        songs: [
          {
            title: "queen",
            imgUrl: "https://i.ytimg.com/vi/R45TbNNQrzg/hqdefault.jpg"
          }
        ],
        imgUrl: ""
      },
      tagToAdd: "",
      img: "",
      songToFind: "",
      dynamicTags: ["Tag 1", "Tag 2", "Tag 3"],
      inputVisible: false,
      inputValue: ""
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
      this.$store.dispatch({ type: "saveStation", station: this.station });
      this.$router.push("/stations");
    },
    async onUploadImg(ev) {
      const res = await uploadImg(ev);
      this.img = res.url;
      this.station.imgUrl = this.img;
    },
    async searchSongs() {
      console.log(this.songToFind);
      await this.$store.dispatch({
        type: "searchSong",
        songStr: this.songToFind
      });
      // .then(songList => {console.log(songList);});
    },
    addSong(song) {
      //  console.log(song)
      this.station.songs.push(song);
      //  console.log(this.station)
      this.$store.dispatch({ type: "saveStation", station: this.station });
      //  console.log(this.station.songs)
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
    }
  },
  components: {
    stationService,
    youtubeSongs
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