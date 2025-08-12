<script setup lang="ts">
import { BoxCounter, BoxTools, BoxSplitter, boxSizeList } from '@/lib/BoxUtils';
import { ref, reactive } from 'vue';

const mainCounter = ref(new BoxCounter());

const splitters = ref(2);
const splits = ref([]);

function splitBoxes() {
  const splitResult = BoxSplitter.SplitScu(mainCounter.value, splitters.value);

  splits.value = splitResult.splits;
}
</script>

<template>
  <div class="splitter__container">
    <div class="counter">
      <div class="counter__amount">boxes: {{mainCounter.boxAmount}}</div>
      <div class="counter__amount">scu: {{mainCounter.scuAmount}}</div>
      <div class="counter__boxes">
        boxes
        <div class="counter__box_group" v-for="boxSize in boxSizeList">
          <span class="counter__box_group__collection">{{boxSize}}: {{mainCounter.tally[boxSize]}}</span>
          <span class="counter__box_group__buttons">
            <button @click="mainCounter.IncrementIndex(boxSize)">+</button>
            <button @click="mainCounter.DecrementIndex(boxSize)">-</button>
          </span>
        </div>
      </div>
      <div class="splitter">
        <input class="splitter__input" type="number" min="2" v-model="splitters" />
        <button @click="splitBoxes">split!</button>
      </div>
    </div>
    <div class="splits">
      <div class="split__item" v-for="(split, index) in splits">
        <div>
          <span>Split: </span>
          <span>{{index + 1}}</span>
        </div>
        <div>
          <span>Total scu: </span>
          <span>{{split.scuAmount}}</span>
        </div>
        <span v-for="boxSize in  boxSizeList">
          <span>{{boxSize}}scu | </span>
          <span>{{split.tally[boxSize]}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splitter__container {
  display: flex;
  width: 100%;
  height: 100%;
}

.counter {
  width: 150px;
  padding: 15px;

  background-color: #555;
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

.splitter {
  display: flex;
  align-items: start;
}

.splitter__input {
  display: block;
  width: 100%;
}

.splits {
  width: 100%;
  padding: 15px;

  display: flex;
}

.split__item {
  display: flex;
  flex-direction: column;

  padding: 10px;
}
</style>