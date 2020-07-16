<template>
  <div id="app">
    <div class="main-nav flex space-between align-center justify-center container">
      <span>logo</span>
      <div>
      <router-link class="router-link" to="/">Home</router-link> |
      <router-link class="router-link" to="/dashboard">Statistics</router-link> |
      <router-link class="router-link" to="/about">About</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>


