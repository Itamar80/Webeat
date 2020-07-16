<template>
  <div id="app">
<header class="header">
    <div class="main-header flex space-between align-center justify-center container">
      <span class="logo">logo</span>
      <div>
      <router-link class="router-link" to="/">Home</router-link> |
      <router-link class="router-link" to="/dashboard">Statistics</router-link> |
      <router-link class="router-link" to="/about">About</router-link> |
      <router-link class="router-link" to="/login">Login</router-link>
      </div>
    </div>
</header>
    <router-view/>
  </div>
</template>


