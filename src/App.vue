<script setup>
import {RouterView} from "vue-router";

import NavButton from "@/components/NavButton.vue";
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <NavButton to="/">Home</NavButton>
      <NavButton to="/splitter">Splitter</NavButton>
    </nav>
    <div class="view">
      <RouterView />
    </div>
  </div>
</template>

<style>
:root {
  --black: #031927;
  --dark-blue: #06314C;
  --blue: #03587A;
  --light-blue: #007EA7;
  --gray: #778289;
  --dark-gray: #3D4E58;
  --white: #EBEBEB;
  --red: #931F1D;
  --light-red: #CC2B28;
  --green: #30A523;
  --light-green: #54D846;
}
</style>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: var(--black);
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
  overflow-y: hidden;
}
</style>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
}
</style>
