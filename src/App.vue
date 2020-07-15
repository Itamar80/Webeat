<template>
  <div id="app">
    <div id="nav">
      <span>logo</span>
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/dashboard">Statistics</router-link> | -->
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


