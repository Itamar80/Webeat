<template>
  <div id="app">
<header class="header">
    <div class="main-header flex space-between align-center justify-center container">
      <span @click="$router.push('/')"
 class="logo">
        <img class="logo-img" src="./assets/logo.png" alt="">
      </span>
      <nav>
      <router-link class="nav-btn router-link router-btn" to="/">Home</router-link> 
      <router-link class="nav-btn router-link router-btn" to="/stations">Stations</router-link> 
      <router-link class="nav-btn router-link router-btn" to="/dashboard">Statistics</router-link> 
      <router-link class="nav-btn router-link router-btn" to="/about">About</router-link> 
      <router-link class="nav-btn router-link router-btn" to="/login">Login</router-link>
     <router-link class="nav-btn router-link router-btn" to="/edit">Create station</router-link>

      </nav>
    </div>
</header>
    <router-view/>
  </div>
</template>






