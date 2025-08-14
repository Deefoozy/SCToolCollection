<script setup lang="ts">
import { BoxCounter, BoxTools, BoxSplitter, boxSizeList } from '@/lib/BoxUtils';
import { ref, reactive, computed } from 'vue';

import SplitResult from "@/components/SplitResult.vue";

const mainCounter = ref(new BoxCounter());

const splitters = ref(2);
const splits = ref([]);
const splitsGenerated = computed(() => {return splits.value.length > 0});

function splitBoxes() {
  const splitResult = BoxSplitter.SplitScu(mainCounter.value, splitters.value);

  splits.value = splitResult.splits;
}

function clearSplits() {
  splits.value = [];
}
</script>

<template>
  <div class="main__container">
    <div class="counter">
      <div class="counter__amount">boxes: {{mainCounter.boxAmount}}</div>
      <div class="counter__amount">scu: {{mainCounter.scuAmount}}</div>
      <div class="counter__boxes">
        boxes
        <div class="counter__box_group" v-for="boxSize in boxSizeList">
          <div class="counter__box_group__collection">
            <span>{{boxSize}}:</span>
            <span>{{mainCounter.tally[boxSize]}}</span>
          </div>
          <span class="counter__box_group__buttons">
            <button class="counter__button counter__button--small counter__button--add" @click="mainCounter.IncrementIndex(boxSize)">+</button>
            <button class="counter__button counter__button--small counter__button--remove" @click="mainCounter.DecrementIndex(boxSize)">-</button>
          </span>
        </div>
      </div>
      <div class="splitter__container">
        <div class="splitter" v-if="!splitsGenerated">
          <input class="splitter__input" type="number" min="2" v-model="splitters" />
          <button class="counter__button counter__button--large" @click="splitBoxes">split!</button>
        </div>
        <div class="splitter" v-else>
          <button class="counter__button counter__button--large" @click="clearSplits">clear!</button>
        </div>
      </div>
    </div>
    <div class="splits">
      <SplitResult v-for="(split, index) in splits" :split="split" :id="index + 1" :boxSizeList="boxSizeList" />
    </div>
  </div>
</template>

<style scoped>
.main__container {
  display: flex;
  width: 100%;
  height: 100%;
}

.counter {
  width: 150px;
  padding: 15px;

  color: var(--white);
  background-color: var(--dark-blue);
}

.counter__amount {
  display: flex;
  width: 100%;
}

.counter__box_group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.counter__box_group__collection {
  margin: 0 5px 0 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.counter__box_group__buttons {
  display: flex;

  justify-content: center;
  align-items: center;
}

.splitter {
  margin: 10px 0 0 0;
  height: 25px;

  display: flex;
  align-items: start;
}

.splitter__input {
  color: var(--white);
  padding: 0 3px 0 10px;
  margin: 0 5px 0 0;
  display: block;
  width: 100%;

  border: none;

  background-color: var(--blue);
  border-radius: 5px;
  height: 25px;
}



.splits {
  width: 100%;
  padding: 15px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;

  overflow-x: hidden;
  overflow-y: auto;
}

.split__item {
  display: flex;
  flex-direction: column;

  padding: 10px;
}

.counter__button {
  margin: 0 1px;
  color: var(--white);
  background-color: var(--blue);
  border: none;

  border-radius: 5px;

  transition: background-color 50ms ease-in-out;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.counter__button:hover {
  background-color: var(--light-blue);
}

.counter__button--small {
  width: 15px;
  height: 15px;
}

.counter__button--large {
  width: 100%;
  height: 25px;
}

.counter__button--add {
  background-color: var(--green);
}

.counter__button--add:hover {
  background-color: var(--light-green);
}

.counter__button--remove {
  background-color: var(--red);
}

.counter__button--remove:hover {
  background-color: var(--light-red);
}
</style>