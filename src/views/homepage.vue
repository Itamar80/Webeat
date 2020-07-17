<template>
  <div class="homepage">
    <!-- <img class="hero-img" :src="img" alt=""> -->
    <div class="hero-img">
      <img src="@/assets/hero.jpg" />
      <img src="@/assets/hero1.webp" />
      <img src="@/assets/hero 2.webp" />
      <img src="@/assets/hero3.webp" />
    </div>
    <div class="container">
        <router-link :to="'/stations'" class="button">Get Started</router-link>
    </div>
    <!-- <div class="wrap">
      <button class="button" @click="start">Get Started</button> 
    </div> -->
  </div>
</template>

<script>
// import hero from "@/assets/hero.jpg"
// import hero1 from "@/assets/hero1.webp"
// import hero2 from "@/assets/hero 2.webp"
// import hero3 from "@/assets/hero3.webp"
export default {
  name: 'homePage',
  data(){
    return{
      // img: hero3
    }
  },
  created(){
    // this.getImg()
  },
  methods:{
    start(){
      this.$router.push('/stations')
    }
  },
  //   getImg(){
  //   var i = 0;
  //   var imgUrls = [hero, hero1,hero2,hero3];
  //   const intervalId = setInterval(()=> {
  //     if (i > imgUrls.length-1) i=0;
  //     this.img = imgUrls[i] 
  //     i++
  //     }, 5000)
  //   }
    
  // }, destroyed(){
  //   clearInterval(intervalId)
  // },
  components: {}
}
</script>
