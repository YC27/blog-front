<script setup>
import { onMounted, ref } from 'vue';
import { GameMap } from '../../assets/js/GameMap.js';

const parent = ref()
const canvas = ref()

onMounted(() => {
  // pkStore.updateGameObj()
  new GameMap(canvas.value.getContext("2d"), parent.value)
})


</script>

<template>
  <div ref="parent" class="game-map">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<style scoped>
.game-map {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /*水平*/
  align-items: center;
  /*竖直*/
}
</style>