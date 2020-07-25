<template>
  <header :class="navClass">
    <!-- <div class="main-header flex space-between align-center justify-center"> -->
    <span @click="$router.push('/')" class="logo flex align-center justify-center">
      <img class="logo-img" src="@/assets/welogo.png" alt />
    </span>
    <span @click="toggleMenu" class="hamburger">☰</span>
    <nav class="main-nav">
      <router-link class="nav-btn router-link router-btn" to="/edit">Create station</router-link>
      <router-link class="nav-btn router-link router-btn" to="/stations">Stations</router-link>
      <router-link class="nav-btn router-link router-btn" to="/login">Login</router-link>
    </nav>
    <!-- <router-link class="nav-btn router-link router-btn" to="/">Home</router-link> -->
    <!-- <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link>
    <router-link class="nav-btn router-link router-btn" to="/about">About</router-link>-->
    <!-- </div> -->
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  created() {},
  computed: {
    navClass() {
      if (this.$route.name === "home")
        return "header transparent flex space-between align-center justify-center";
      else return "header flex space-between align-center justify-center";
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.classList.toggle("menuopen");
    },
  },
  components: {},
};
</script>






