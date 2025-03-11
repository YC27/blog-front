<script setup>
import {onMounted, ref} from "vue";
import { getBlogList } from "../../api/blog/blog.js";
import { useUserStore } from "../../store/user.js";
import { useRouter } from "vue-router";
import {deleteById} from "../../api/blog/blog.js";
import {errorMsg, successMsg} from "../../util/box.js";

const router = useRouter()
const userStore = useUserStore()
const blogList = ref([])
const total = ref(0)
const background = ref(true)
const small = ref(true)
const blogPage = ref({
  tagName: '',
  blogStatus: 0,
  tagId: null,
  userId: userStore.user.userId,
  blogPrivate: null,
  blogSort: '',
  updateTime: '',
  title: '',
  size: 4,
  currentPage: 1,
  sortStr: 'DESC',
  classificationId: null,
})

const getRandomColor = () => {
  let rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  if (rand.length == 6) {
    return rand;
  } else {
    return getRandomColor();
  }
}

const getList = async () => {
  await getBlogList(blogPage.value).then(res => {
    total.value = res.data.total
    blogList.value = res.data.list.list
    blogList.value.map(item => {
      item.updateTime = item.updateTime.toString().slice(0, 10)
      item.blogSort = item.blogSort.split(',')
      return item
    })
  })
}

const deleteBlog = async (id) => {
  await deleteById(id).then(res => {
    if ( res.success ) {
      successMsg("删除成功")
      getList()
    } else {
      errorMsg("网络错误,稍后再试")
    }
  })
}

onMounted(() => {
  getList()
})

</script>

<template>
  <el-timeline>
    <el-timeline-item v-for="blog in blogList" :key="blog.blogId"
                      :color="'#' + getRandomColor()" :timestamp="blog.updateTime" placement="top">
      <el-card shadow="hover" style="margin-right: 30px">
        <el-row>
          <el-col :span="6">
            <img v-if="!blog.coverSrc" src="https://img1.baidu.com/it/u=862643436,2314916068&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1703437200&t=4e55305ad25b3a79a3a5bb6c233a8bd9"
                 class="image"/>
            <img v-else :src="blog.coverSrc"
                 class="image"/>
          </el-col>
          <el-col :span="13">
            <el-space alignment="start" direction="vertical">
              <span style="font-size: 15px;font-weight: bold">{{blog.title}}</span>
              <span>
                分类夹: <el-tag type="success" style="margin-left: 5px">{{blog.classification.classificationTitle}}</el-tag>
              </span>
              <span>
                分类:
                <el-tag v-for="sort in blog.blogSort" :key="sort" style="margin-left: 5px">{{sort}}</el-tag>
              </span>
              <span>标签: <el-tag effect="plain">{{blog.articleTag.tagName}}</el-tag></span>
            </el-space>
          </el-col>
          <el-col :span="5">
            <el-space direction="horizontal" style="margin-top: 30%">
              <el-button type="primary" @click="router.push({path: '/blog', query: {blogId: blog.blogId}})"> 编辑 </el-button>
              <el-button type="danger" @click="deleteBlog(blog.blogId)"> 删除 </el-button>
            </el-space>
          </el-col>
        </el-row>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  <el-pagination
      class="page-style"
      v-model:current-page="blogPage.currentPage"
      v-model:page-size="blogPage.size"
      :page-sizes="[4, 6, 8, 10, 12, 14]"
      :small="small"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="getList"
      @current-change="getList"
  />
</template>

<style scoped>
.image {
  width: 120px;
  height: 120px;
}
.page-style {
  margin-top: 10px;
  float: right;
  margin-right: 20px;
}
</style>