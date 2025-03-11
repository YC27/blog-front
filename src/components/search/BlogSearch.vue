<script setup>
import {ref} from "vue";

const blogPage = ref({
  tagName: '',
  blogStatus: 1,
  tagId: null,
  userId: null,
  blogPrivate: null,
  blogSort: '',
  updateTime: '',
  title: '',
  size: 12,
  currentPage: 1,
  sortStr: ''
})
</script>

<template>

</template>

<style scoped>
.search-condition {
  display: flex;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 10px;
}
</style>