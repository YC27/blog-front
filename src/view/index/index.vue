<script setup>
import {onMounted, ref, watch} from 'vue'
import { useRouter } from "vue-router";
import { getBlogList } from "../../api/blog/blog.js";

// 文章展示
const blogList = ref([])
const total = ref(0)
const background = ref(true)
const small = ref(true)
const blogPage = ref({
  tagName: '',
  blogStatus: 1,
  tagId: null,
  userId: null,
  blogPrivate: 1,
  blogSort: '',
  updateTime: '',
  title: '',
  size: 12,
  currentPage: 1,
  sortStr: 'DESC'
})
const getList = async () => {
  await getBlogList(blogPage.value).then(res => {
    total.value = res.data.total
    blogList.value = res.data.list.list
    blogList.value.map(item => item.blogSort = item.blogSort.split(","))
  })
}

const upSort = () => {
  blogPage.value.sortStr = ""
  getList()
}
const downSort = () => {
  blogPage.value.sortStr = "DESC"
  getList()
}

onMounted(() => {
  getList()
})

const router = useRouter()

</script>

<template>

  <div>
    <el-card class="search-condition">
      <el-space style="margin-top: -15px">
        <el-radio-group v-model="blogPage.sortStr" class="ml-4">
          <el-radio @click="downSort" label="DESC" size="large">时间降序</el-radio>
          <el-radio @click="upSort" label="" size="large">时间升序</el-radio>
        </el-radio-group>
        <el-input style="margin-left: 10px" clearable v-model="blogPage.title" placeholder="输入搜索标题,按回车搜索" @keydown.enter="getList"/>
      </el-space>
    </el-card>
  </div>
  <el-card class="card-style">

    <div>
      <el-space wrap :size="20" class="show-article" >
        <el-card shadow="hover" v-for="blog in blogList" :key="blog.blogId" class="box-card" style="width: 300px; height: 500px">
          <img v-if="!blog.coverSrc" src="https://img1.baidu.com/it/u=862643436,2314916068&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1703437200&t=4e55305ad25b3a79a3a5bb6c233a8bd9"
               class="image"/>
          <img v-else :src="blog.coverSrc"
               class="image"/>
          <div style="padding: 14px">
            <div class="alignment-container">
              <el-space @click="router.push({path: '/space', query: {userId: blog.user.userId}})">
                <el-avatar class="user-avatar" :size="50" :src="blog.user.avatar"/>
                <el-text class="mx-1 blog-title" style="font-size: 18px;margin-left: 10px" type="warning">{{blog.user.nickname}}</el-text>
              </el-space>
            </div>
            <div class="bottom">
              <h4 class="blog-title" @click="router.push({path: '/show', query: {blogId: blog.blogId}})">{{blog.title}}</h4>
              <el-space wrap size="small">
                <span>分类:</span>
                <el-tag v-for="(sort, i) in blog.blogSort" :key="i">{{sort}}</el-tag>
              </el-space>
              <br/>
              <el-space wrap size="small" style="margin-top: 10px">
                <span>用户标签:</span>
                <el-tag effect="plain">{{blog.articleTag.tagName}}</el-tag>
              </el-space>
            </div>
          </div>
        </el-card>
      </el-space>
    </div>
    <el-pagination
        class="page-style"
        v-model:current-page="blogPage.currentPage"
        v-model:page-size="blogPage.size"
        :page-sizes="[10, 12, 14, 16, 18, 20]"
        :small="small"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getList"
        @current-change="getList"
    />
  </el-card>

</template>

<style scoped>
.search-condition {
  display: flex;
  margin-left: 10%;
  width: 80%;
  height: 50px;
  margin-top: 20px;
  //margin-bottom: 10px;
}
.show-article {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.time {
  font-size: 12px;
  color: #999;
}

.card-style {
  margin-top: 5px;
  //line-height: 12px;
  margin-left: 10%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}
.page-style {
  margin-top: 20px;
  float: right;
  margin-right: 20px;
}
.blog-title:hover{
  color: blue;
  cursor: pointer;
}
.user-avatar:hover {
  transform: scale(1.15);
}
.user-avatar {
  cursor: pointer;
  transition: all 0.6s;
}
</style>