<template>
  <section class="chat-app">
    <h1>Share your thoughts</h1>
    <section class="chat-container">
    <!-- <span class="is-typing" v-if="isTyping">{{user}} is  typing
      <div class="jump1"></div>
      <div class="jump2"></div>
      <div class="jump3"></div>
      <div class="jump4"></div>
      <div class="jump5"></div>
    </span> -->
    <ul class="clean-list flex col">
      <li :class="classMessage(msg)"   v-for="(msg,idx) in msgs"  :key="idx">{{msg.from.fullName}} : {{msg.txt}}</li>
      <!-- <li class="message-strange"  v-for="(msg,idx) in otherMsgs" :key="idx">{{msg.from.fullName}} : {{msg.txt}}</li> -->
    </ul>
    </section>
    <form class="chat-form flex justify-center" @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" @input="setIsTyping" />
      <button class="chat-btn btn">Send</button>
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
      msgs:[],
      myMsgs:[],
      otherMsgs:[],
      // sortMsgs:[]
      //TODO msgs from me and from others 
    };
  },
  created() {
    let id = this.$route.params.id
    this.msg.from = this.loggedinUser;
    // console.log('halulu',this.msg.from._id);
    // console.log('halululoggedin',this.loggedinUser._id);
    // this.$store.dispatch({type:'setupSocket'})
    this.$store.dispatch({type:'setupSocketName',chatId:id})
    this.$store.dispatch({type:'addMsg',msg:this.addMsg})
    this.$store.dispatch({type:'showTyping',msg:this.addMsg})
  },
  destroyed() {
    socketSerivce.off("chat addMsg", this.addMsg);
    
  },
  computed:{
    loggedinUser(){
      let user = JSON.parse(this.$store.getters.loggedinUser);
      console.log('user lala yser',user);
     return user
    },
    lastMsg(){
      return this.$store.getters.lastMsg 
    },
    
    // msgs(){
    //   return this.$store.getters.msgs
    // },
  },
  methods: {
    classMessage(msg){
      // let myMsgs= this.msgs.filter(msg=>{
      //   console.log('msg is :',msg);
      // return msg.from._id===this.loggedinUser._id
      // })
      if(msg.from._id===this.loggedinUser._id){
        console.log('classmsg adom');
        return 'message'
      }else  return 'message-strange'
    },
    // getUserId(){
      // let loggedin= sessionStorage.getItem('guest');
    // console.log('loggedinss',JSON.parse(loggedin));
    // return loggedin._id
    // },

    addMsg(msg) {
      if(msg.from._id===this.loggedinUser._id){
      this.myMsgs.push(msg)
      } else {
        this.otherMsgs.push(msg)
        }
        this.msgs.push(msg)
      this.$store.commit({type:'setLastMsg',msg})
    // this.$store.commit({type:'updateMsgs',msg})
      // this.isTyping=false
      
    },
    setIsTyping(){
      if(this.msg.txt !== '')  socketSerivce.emit('chat typing',this.msg.from);
      else this.isTyping=false;
    },
    showTyping(userName){
      this.isTyping=true;
      console.log('userName is typing',userName);
      this.user = userName
    },
    sendMsg() {
      this.isTyping=false
      this.msg.sentAt = Date.now()
      this.$store.dispatch({type:'sendMsg',msg:this.msg})
      this.msg = {stationId:this.station._id,from:this.loggedinUser,txt:''}
    },
  },
  }
</script>