<script setup>
import { useUserStore } from "../../store/user.js";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import { getBlogList } from "../../api/blog/blog.js";
import {getUser} from "../../api/user/user.js";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const blogList = ref([])
const total = ref(0)
const background = ref(true)
const small = ref(true)
const userId = ref(null)
const isOther = ref(false)
const user = ref({})
const blogPage = ref({
  tagName: '',
  blogStatus: null,
  tagId: null,
  userId: null,
  blogPrivate: null,
  blogSort: '',
  updateTime: '',
  title: '',
  size: 6,
  currentPage: 1,
  sortStr: 'DESC',
  classificationId: route.query.classificationId,
})

const getUserById = async (id) => {
  await getUser(id).then(res => {
    user.value = res.data.user
  })
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

onMounted(() => {
  blogPage.value.classificationId = route.query.classificationId
  if ( route.query.userId !== userStore.user.userId ) {
    isOther.value = true
    getUserById(route.query.userId)
    blogPage.value.userId = route.query.userId
  }
  getList()
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
        <el-card class="card-style">
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
          <el-pagination
              class="page-style"
              v-model:current-page="blogPage.currentPage"
              v-model:page-size="blogPage.size"
              :page-sizes="[6, 8, 10, 12, 14, 16]"
              :small="small"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="getList"
              @current-change="getList"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.info-card {
  width: 80%;
  margin: 20px auto;
}
.show-article {
  width: 100%;
//margin-left: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.time {
  font-size: 12px;
  color: #999;
}

.card-style {
//line-height: 12px;
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