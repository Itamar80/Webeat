<template>
<section>
    <h1>This is the login/signup page</h1>
<h2>{{msg}}</h2>
<div class="logged-in flex justify-center align-center col" v-if="loggedinUser">
       <h3> Welcome : {{loggedinUser.fullName}}
        </h3>
        <button @click="doLogout">Logout</button>
      </div>
  <div v-if="!loggedinUser" class="login">
      <form v-if="isUser" @submit="login">
        Username:  <input type="text" v-model="loginCred.username">
     Password:  <input type="password" v-model="loginCred.password">

     <button>Login</button>
      </form>
      <div class="signup container">
      <form class="flex justify-center aign-center col" v-if="!isUser" @submit="signup">
        Email: <input type="text" placeholder="email@example.com" v-model="signupCred.email">
      Username:  <input type="text" v-model="signupCred.username">
     Password:  <input type="password" v-model="signupCred.password">
     Full Name:  <input type="text" v-model="signupCred.fullName">
      <label>
          Upload Image:
          <input type="file" @change="onUploadImg" />
        </label>(optional)
     <button>Signup</button>
      </form>
      </div>
    <span class="change-sign-log">
       New around? <button @click="isUser=!isUser">Signup for free</button>
       
      </span>
  </div>
</section>
</template>

<script>
import { uploadImg } from "@/services/imgUpload.service.js";

export default {
  data(){
    return{
      loginCred:{
       username:null,
        password:null,
      },
      signupCred:{
        username:null,
        password:null,
        email:null,
        fullName:null,
        imgUrl: ""
      },
      isUser:false,
      msg:'',
      img:'',
    }
  },
    computed: {
       loggedinUser() {
         console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser
    }
    },
    methods: {
      async login() {
      const cred = this.loginCred
      if(!this.loginCred.username || !this.loginCred.password) return this.msg = 'Please enter user/password'
      await this.$store.dispatch({type :'login', userCred:cred})
      this.loginCred = {};
      
    },   
    doLogout() {
      this.$store.dispatch({type: 'logout'})
    },
    signup() {
      const cred = this.signupCred
      // console.log('signup-vue',cred);
      if(!cred.email || !cred.password ||!cred.username) return this.msg = 'Please fill up the form'
      this.$store.dispatch({type: 'signup', userCred: cred})
    },
     async onUploadImg(ev) {
      const res = await uploadImg(ev);
      this.img = res.url;
      this.signupCred.imgUrl = this.img;
    },
    },
        created(){
    },
    components:{
    }
}
</script>
