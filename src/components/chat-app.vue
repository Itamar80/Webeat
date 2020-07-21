<template>
  <section>
    <span v-if="isTyping">{{user}} is  typing...</span>
    <ul class="clean-list">
      <li  v-for="(msg,idx) in msgs" :key="idx">{{msg.from}} : {{msg.txt}}</li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" @input="setIsTyping" />
      <button>send msg</button>
    </form>
  </section>
</template>

<script>
import socketSerivce from "../services/socket-service.js";
export default {
  name: "chat",
  props:['station'],
  data() {
    return {
      isTyping:false,
      user:null,
      msg: {stationId:this.station._id, from: null, txt: "", },
      msgs: []
    };
  },
  created() {
    let id = this.$route.params.id
    this.msg.from = this.loggedinUser;
    this.$store.dispatch({type:'setupSocket'})
    this.$store.dispatch({type:'setupSocketName',chatId:id})
    this.$store.dispatch({type:'addMsg',msg:this.addMsg})
    this.$store.dispatch({type:'showTyping',msg:this.addMsg})
  },
  destroyed() {
    socketSerivce.off("chat addMsg", this.addMsg);
    socketSerivce.terminate();
  },
  computed:{
    loggedinUser(){
     let user = (this.$store.getters.loggedinUser)? this.$store.getters.loggedinUser: {userName:'Guest'};
     return user.userName
    },
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg);
      this.isTyping=false
    },
    setIsTyping(){
      if(this.msg.txt !== '')  socketSerivce.emit('chat typing',this.msg.from);
      else this.isTyping=false;
    },
    showTyping(userName){
      this.isTyping=true;
      this.user = userName
    },
    sendMsg() {
      this.isTyping=false
      this.msg.sentAt = Date.now()
      socketSerivce.emit("chat newMsg", this.msg);
      this.msg = {stationId:this.station._id,from:this.loggedinUser,txt:''}
    },
  },
  }
</script>