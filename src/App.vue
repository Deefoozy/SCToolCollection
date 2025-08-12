<script setup>
import Splitter from "@/components/Splitter.vue";
import {RouterView, RouterLink} from "vue-router";
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/splitter">Splitter</RouterLink>
    </nav>
    <div class="view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.navbar {
  display: flex;
  flex-direction: column;
  width: 75px
}

.view {
  width: 100%;
  height: 100%;
  max-width: calc(100vw - 75px);
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
}
</style>
