<script setup>
import NavBar from "./components/header/NavBar.vue";
</script>

<template>
  <NavBar/>
  <router-view/>
</template>

<style>
body {
  margin-bottom: 50px;
}
.TanText {
  color: white;
  position: fixed;
  right: 0px;
  font-size: 20px;
  white-space: nowrap
}

</style>
