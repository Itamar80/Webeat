<template>
  <div id="app">
<header class="header">
    <div class="main-header flex space-between align-center justify-center container">
      <span class="logo">logo</span>
      <nav>
      <router-link class="nav-btn router-link" to="/">Home</router-link> 
      <router-link class="nav-btn router-link" to="/stations">Stations</router-link> 
      <router-link class="nav-btn router-link" to="/dashboard">Statistics</router-link> 
      <router-link class="nav-btn router-link" to="/about">About</router-link> 
      <router-link class="nav-btn router-link" to="/login">Login</router-link>
      </nav>
    </div>
</header>
    <router-view/>
  </div>
</template>



