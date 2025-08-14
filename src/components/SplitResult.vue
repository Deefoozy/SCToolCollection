<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(["id", "split", "boxSizeList"]);

const completed = ref(false);
</script>

<template>
  <div class="split__result">
    <div @click="completed = !completed" class="split__id" :class="{'split__id--completed': completed}">
      {{ id }}
    </div>
    <span class="split__individual_scu_container" v-for="boxSize in boxSizeList">
      <span class="split__individual_scu_container__scu">{{ boxSize }}</span>
      <span>{{ split.tally[boxSize] }}</span>
    </span>
    <div class="split__totals_container">
      <span class="split__totals_container__scu">{{ split.scuAmount }}</span>
      <span>{{ split.boxAmount }}</span>
    </div>
  </div>
</template>

<style scoped>
.split__result {
  width: 100px;
  height: fit-content;
  margin: 0 2px 4px;

  color: var(--white);
  display: flex;
  flex-direction: column;

  padding: 5px 5px;

  background-color: var(--dark-blue);
  border-radius: 5px;
}

.split__id {
  transition: color 50ms ease-in-out, background-color 50ms ease-in-out;
  font-size: 10px;

  color: var(--gray);
  background-color: var(--black);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 15px;
  border-radius: 5px;
  margin: 0 0 5px;

  cursor: pointer;
  user-select: none;it
}

.split__id--completed {
  color: var(--black);
  background-color: var(--green);
}

.split__totals_container {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--gray);
  margin: -1px 0 0 0;
}

.split__totals_container__scu {
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.split__individual_scu_container {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--dark-gray);
}

.split__individual_scu_container__scu {
  padding: 0 5px 0 0;
  width: calc(25% + 5px);
  height: inherit;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-right: 1px solid var(--dark-gray);
}
</style>