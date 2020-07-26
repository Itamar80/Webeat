<template>
  <section class="chat-app">
    <h1>Share your thoughts</h1>
    <section class="chat-container" ref="chat">
      <!-- <span class="is-typing" v-if="isTyping">{{user}} is  typing
      <div class="jump1"></div>
      <div class="jump2"></div>
      <div class="jump3"></div>
      <div class="jump4"></div>
      <div class="jump5"></div>
      </span>-->
      <vue-custom-scrollbar
        suppressScrollX
        class="scroll-area"
        :settings="settings"
        @ps-scroll-y="scrollHanle"
      >
        <ul class="clean-list flex col">
          <li :class="classMessage(msg)" v-for="(msg,idx) in msgs" :key="idx">
            <!-- <img class="user-chat-img" src="@/assets/default-guest.jpg" alt="User image"> -->
            {{msg.from.fullName}} : {{msg.txt}}
            <span
              class="msg-time"
            >{{new Date().getHours()}}:{{new Date().getMinutes()}}</span>
          </li>
        </ul>
      </vue-custom-scrollbar>
    </section>
    <form class="chat-form flex justify-center" @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" @input="setIsTyping" />
      <button class="chat-btn btn">Send</button>
    </form>
  </section>
</template>

<script>
import socketSerivce from "../services/socket-service.js";
import vueCustomScrollbar from "vue-custom-scrollbar";
// import Vue from 'vue'
// import VueChatScroll from 'vue-chat-scroll'
// Vue.use(VueChatScroll)

export default {
  name: "chat",
  props: ["station"],
  data() {
    return {
      isTyping: false,
      user: null,
      msg: { stationId: this.station._id, from: null, txt: "" },
      msgs: [],
      myMsgs: [],
      otherMsgs: [],
      settings: {
        maxScrollbarLength: 60,
        suppressScrollX: true,
      },
    };
  },
  created() {
    let id = this.$route.params.id;
    this.msg.from = this.loggedinUser;
    this.$store.dispatch({ type: "setupSocketName", chatId: id });
    this.$store.dispatch({ type: "addMsg", msg: this.addMsg });
    this.$store.dispatch({ type: "showTyping", msg: this.addMsg });
  },
  destroyed() {
    socketSerivce.off("chat addMsg", this.addMsg);
  },
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },
  computed: {
    loggedinUser() {
      let user = this.$store.getters.loggedinUser;
      return user;
    },
    lastMsg() {
      return this.$store.getters.lastMsg;
    },
  },
  methods: {
    scrollHanle(evt) {},
    scrollToEnd() {
      var content = this.$refs.chat;
      content.scrollTop = content.scrollHeight;
      
    },
    classMessage(msg) {
      if (msg.from._id === this.loggedinUser._id) {
        return "message";
      } else return "message-strange";
    },
    addMsg(msg) {
      this.msgs.push(msg);
      this.$store.commit({ type: "setLastMsg", msg });
      this.scrollToEnd();
    },
    setIsTyping() {
      if (this.msg.txt !== "") socketSerivce.emit("chat typing", this.msg.from);
      else this.isTyping = false;
    },
    showTyping(userName) {
      this.isTyping = true;
      this.user = userName;
    },
    sendMsg() {
      this.isTyping = false;
      this.msg.sentAt = Date.now();
      this.$store.dispatch({ type: "sendMsg", msg: this.msg });
      this.msg = {
        stationId: this.station._id,
        from: this.loggedinUser,
        txt: "",
      };
      this.scrollToEnd();
    },
  },
  components: {
    vueCustomScrollbar,
  },
};
</script>