<script setup lang="ts">
import {RouterLink} from "vue-router";

const props = defineProps(['to'])
</script>

<template>
  <RouterLink
      v-slot="{navigate, isActive}"
      :to="props.to"
      custom
  >
    <button @click="navigate" class="button" :class="{active: isActive}">
      <slot />
    </button>
  </RouterLink>
</template>

<style scoped>
  .button {
    width: 100%;
    height: 25px;
    color: var(--white);
    background-color: var(--black);
    border: none;

    transition: background-color 50ms ease-in-out;
    cursor: pointer;
  }

  .button:hover {
    background-color: var(--dark-blue);
  }

  .button.active {
    background-color: var(--dark-blue);
  }
</style>