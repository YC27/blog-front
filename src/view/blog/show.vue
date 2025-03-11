<script setup>
import BlogContent from "../../components/blog/BlogContent.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getArticleById} from "../../api/blog/blog.js";

const route = useRoute()
const blog = ref({})

const getArticle = async (id) => {
  await getArticleById(id).then(res => {
    blog.value = res.data.blog
  })
}

onMounted(() => {
  getArticle(route.query.blogId)
})

</script>

<template>
  <el-card class="blog-card">
    <div class="blog-content">
      <BlogContent :content="blog.content" :theme="blog.theme" :codeTheme="blog.codeTheme" :previewTheme="blog.previewTheme"/>
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