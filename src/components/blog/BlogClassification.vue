<script setup>
import { useUserStore } from "../../store/user.js";
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import { getListById, updateTitle } from "../../api/blog/classification.js";
import {errorMsg, successMsg} from "../../util/box.js";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const classifyList = ref([])

const userId = ref(null)

const getClassificationList = async () => {
  await getListById(userId.value).then(res => {
    classifyList.value = res.data.classificationList
    classifyList.value.map(item => item.updateTime = item.updateTime.toString().slice(0, 10))
  })
}

onMounted(() => {
  if ( route.query.userId ) {
    userId.value = route.query.userId
  } else {
    userId.value = userStore.user.userId
  }
  getClassificationList()
})

const getRandomColor = () => {
  let rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  if (rand.length == 6) {
    return rand;
  } else {
    return getRandomColor();
  }
}

// 更新标签
const updateTitleDialog = ref(false)
const classificationModel = ref({
  classificationId: null,
  classificationTitle: '',
})
const updateClassTitle = async () => {
  await updateTitle(classificationModel.value).then(res => {
    if ( res.success ) {
      successMsg("更新成功")
      getClassificationList()
      updateTitleDialog.value = false
    } else {
      errorMsg("网络错误,稍后再试")
    }
  })
}
const updateClassify = (i, t) => {
  classificationModel.value.classificationId = i
  classificationModel.value.classificationTitle = t
  updateTitleDialog.value = true
}
const cancelUpdate = () => {
  classificationModel.value = {
    classificationId: null,
    classificationTitle: '',
  }
  updateTitleDialog.value = false
}
const confirmUpdate = () => {
  updateClassTitle()
  updateTitleDialog.value = false
}

</script>

<template>
  <el-timeline>
    <el-timeline-item v-for="item in classifyList" :key="item.classificationId"
                      :color="'#' + getRandomColor()" :timestamp="item.updateTime" placement="top">
      <el-card class="classification-card">
          <el-row>
            <el-col :span="6" style="margin-top: 5px">
              {{item.classificationTitle}}
            </el-col>
            <el-col :span="12" style="margin-top: 5px">
              {{item.updateTime}}
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="router.push({path: '/classification', query: {classificationId: item.classificationId, userId: userId}})">查看文章</el-button>
              <el-button v-if="userId===userStore.user.userId" @click="updateClassify(item.classificationId, item.classificationTitle)">编辑名称</el-button>
            </el-col>
          </el-row>
      </el-card>
    </el-timeline-item>
  </el-timeline>

  <el-dialog
      v-model="updateTitleDialog"
      title="编辑名称"
      width="30%"
      align-center
  >
    <el-input v-model="classificationModel.classificationTitle"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelUpdate">取消</el-button>
        <el-button type="primary" @click="confirmUpdate">
          更新
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.classification-card {

}
</style>