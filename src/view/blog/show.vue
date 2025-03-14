<script setup>
import BlogContent from "../../components/blog/BlogContent.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getArticleById} from "../../api/blog/blog.js";
import {useUserStore} from "@/store/user.js";

const route = useRoute()
const router = useRouter()
const blog = ref({})
const userId = ref(0);
const userStore = useUserStore();

const getArticle = async (id) => {
  await getArticleById(id).then(res => {
    blog.value = res.data.blog
    userId.value = res.data.blog.userId
    console.log(userId.value, userStore.user.userId)
  })
}

onMounted(() => {
  getArticle(route.query.blogId)
})

</script>

<template>
  <el-card class="blog-card">
    <el-header>
      <el-button style="float: right" type="primary" v-if="userStore.user.userId===userId"
                 @click="router.push({path: '/blog', query:{blogId: route.query.blogId}})">编辑
      </el-button>
    </el-header>
    <div class="blog-content">
      <BlogContent :content="blog.content" :theme="blog.theme" :codeTheme="blog.codeTheme"
                   :previewTheme="blog.previewTheme"/>
    </div>
  </el-card>
</template>

<style scoped>
.blog-card {
  //display: flex;
  margin-left: 20%;
  margin-top: 40px;
  //justify-content: center;
  width: 60%;
  //align-items: center;
  margin-bottom: 100px;
}

.blog-content {
  width: 100%;
}
</style>