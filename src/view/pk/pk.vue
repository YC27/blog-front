<script setup>
import GameMap from "../../components/game/GameMap.vue"
import {usePkStore} from "../../store/pk.js";
import {useUserStore} from "../../store/user.js";
import {onMounted, onUnmounted, ref, watch} from "vue";

const userStore = useUserStore()
const pkStore = usePkStore()
const winner = ref()
// let websocket = new WebSocket(`ws://localhost:8085/chess/${userStore.user.userId}`)
// onMounted(() => {
//   pkStore.winner = ""
//   pkStore.showColor = {}
//   websocket.onopen =  () => {
//
//   }
//
//   websocket.onmessage = (msg) => {
//     let data = JSON.parse(msg.data)
//     console.log(data)
//     if ( data.event === "playing" ) {
//       pkStore.game = data.game
//       pkStore.socket = websocket
//     }
//   }
//
//   websocket.onclose = () => {
//
//   }
// })
//
onUnmounted(() => {
  pkStore.winner = ""
  pkStore.showColor = {}
  // pkStore.game = {}
  // pkStore.socket = null
  // websocket.close()
})
</script>

<template>
  <div class="playground">
    <GameMap class="game-map-com"/>
  </div>
  <div v-if="pkStore.winner" class="wait" :style="pkStore.showColor">
    Winner is {{pkStore.winner}}
  </div>
</template>

<style scoped>
.wait {
  width: 100%;
  height: 100%;
  margin-top: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 150px;
  user-select: none;
}
div.playground {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
}
.game-map-com {

}
.winner {
  position: absolute;
  font-size: 100px;
  text-align: center;
}
</style>