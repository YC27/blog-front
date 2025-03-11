<script setup>
import { useUserStore } from "../../store/user.js";
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue"
import BlogDraft from "../../components/blog/BlogDraft.vue";
import BlogMyself from "../../components/blog/BlogMyself.vue";
import BlogPrivate from "../../components/blog/BlogPrivate.vue";
import BlogOpen from "../../components/blog/BlogOpen.vue";
import BlogClassification from "../../components/blog/BlogClassification.vue";
import { getUser } from "../../api/user/user.js";

const userStore = useUserStore()
const route = useRoute()
const userId = ref(null)
const isOther = ref(false)
const user = ref({})

const getUserById = (id) => {
  getUser(id).then(res => {
    user.value = res.data.user
  })
}

onMounted(() => {
  if ( route.query.userId ) {
    userId.value = route.query.userId
    if ( userId.value !== userStore.user.userId ) {
      isOther.value = true
      getUserById(userId.value)
    }
  }
})

</script>

<template>
  <div class="info-card">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
            <el-image :src="userStore.user.avatar" fit="fill"/>
          <template #footer>
            <div v-if="!isOther">
              <hr/>
              <label>用户名：{{ userStore.user.username }}</label> <br/> <hr/>
              <label>联系邮箱：{{ userStore.user.email }}</label> <hr/>
            </div>
            <div v-else>
              <hr/>
              <label>用户名：{{ user.username }}</label> <br/> <hr/>
              <label>联系邮箱：{{ user.email }}</label> <hr/>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-tabs type="border-card" style="color: black">
          <el-tab-pane v-if="!isOther" lazy label="我的文章">
            <BlogMyself/>
          </el-tab-pane>
          <el-tab-pane v-if="!isOther" lazy label="我的草稿">
            <BlogDraft/>
          </el-tab-pane>
          <el-tab-pane v-if="!isOther" label="未公开文章">
            <BlogPrivate/>
          </el-tab-pane>
          <el-tab-pane lazy label="已公开文章">
            <BlogOpen/>
          </el-tab-pane>
          <el-tab-pane lazy label="分类夹">
            <BlogClassification/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.info-card {
  width: 80%;
  margin: 20px auto;
}
</style>