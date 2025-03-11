<script setup>
import {computed, ref, watch} from 'vue'
import {useUserStore} from "../../store/user.js";
import {removeToken} from "../../util/auth.js";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore()
const isRouter = ref(true)
const logout = () => {
  userStore.logout()
  removeToken()
  location.reload()
}
const activeIndex = computed(() => {
  return router.currentRoute.value.path === '/' ? '/index' : router.currentRoute.value.path;
})
const handleSelect = (key, keyPath) => {
  activeIndex.value = keyPath[0]
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      :router="isRouter"
      background-color="#212447"
      text-color="#fff"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div class="flex-grow-start"></div>
    <el-menu-item index="/" class="logo-left">
      <img
          style="width: 100px"
          src="../../assets/img/logo.jpg"
          alt="YSC"
      />
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item v-if="userStore.user.userId" index="/index">首页</el-menu-item>
    <el-menu-item v-if="userStore.user.userId" index="/blog">写博客</el-menu-item>
    <el-menu-item index="/board">留言板</el-menu-item>
    <el-menu-item v-if="userStore.user.userId" index="/pk">对战</el-menu-item>
    <el-menu-item v-if="userStore.user.userId" index="/chat">聊天</el-menu-item>

    <div class="flex-grow"></div>
    <el-sub-menu v-if="userStore.user.isLogin" index="/blog">
      <template #title>{{userStore.user.nickname}}</template>
      <el-menu-item index="/info">个人信息</el-menu-item>
      <el-menu-item index="/space">我的空间</el-menu-item>
      <el-menu-item @click="logout" index="">注销</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-if="!userStore.user.isLogin" index="/login">登录</el-menu-item>
    <el-menu-item v-if="!userStore.user.isLogin" index="/register">注册</el-menu-item>

    <div class="flex-grow-end"></div>
  </el-menu>
</template>

<style>
.flex-grow-end {
  flex-grow: 1;
}
.flex-grow-start {
  flex-grow: 1;
}
.flex-grow {
  flex-grow: 2;
}
.logo-left {
  margin-left: 100px;
}
.el-menu-demo {
  font-size: large;
}
body {
  margin: 0;
  padding: 0;
  background-image: url("https://pic3.zhimg.com/v2-969eb56ca1203d812be339fa99058e2e_r.jpg");
  //background-image: url("../../assets/img/index.jpg");
  background-repeat:no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: white;
}
</style>
