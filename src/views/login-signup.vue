<template>
<section>
    <h1>This is the login/signup page</h1>
<h2>{{msg}}</h2>
<div v-if="loggedinUser">
      <h3>
        Loggedin User: 
        {{loggedinUser.username}}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
  <div v-if="!loggedinUser" class="login">
      <form v-if="isUser" @submit="login">
        Email:  <input type="text" v-model="loginCred.username">
     Password:  <input type="password" v-model="loginCred.password">

     <button>Login</button>
      </form>
      <form v-if="!isUser" @submit="signup">
        Email: <input type="text" placeholder="email@example.com" v-model="signupCred.email">
      User name:  <input type="text" v-model="signupCred.username">
     Password:  <input type="password" v-model="signupCred.password">
     <button>Signup</button>
      </form>
     New around? <button @click="isUser=!isUser">Signup for free</button>
  </div>
</section>
</template>

<script>
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

      },
      isUser:false,
      msg:'',
    }
  },
    computed: {
       loggedinUser() {
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
      if(!cred.email || !cred.password ||!cred.username) return this.msg = 'Please fill up the form'
      this.$store.dispatch({type: 'signup', userCred: cred})
    },
    },
        created(){
    },
    components:{
    }
}
</script>
