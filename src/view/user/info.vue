<script setup>
import {useUserStore} from "../../store/user.js";
import {getToken, removeToken} from "../../util/auth.js";
import {_updateAvatar} from "../../api/user/user.js";
import {ref} from "vue";
import {successMsg, errorMsg} from "../../util/box.js";
import {_updatePassword, _updateNickname} from "../../api/user/user.js";
import {useRouter} from "vue-router";
import { UP_LOAD_URL } from "../../util/url.js";

const router = useRouter()
const userStore = useUserStore()
const avatarDTO = ref({
  avatar: ""
})
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    errorMsg("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    errorMsg("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
}
const updateAvatar = () => {
  _updateAvatar(avatarDTO.value).then(res => {
    if (res.success) {
      userStore.setAvatar(avatarDTO.value.avatar)
      successMsg("更新成功")
    }
  })
}

const handleAvatarSuccess = (response, _) => {
  if (response.success) {
    avatarDTO.value.avatar = response.data.url
    updateAvatar()
  }
}
const head = ref({
  "authorization": getToken(),
})

const centerDialogVisible = ref(false)
const passwordForm = ref({
  rawPassword: "",
  newPassword: ""
})
const ruleForm = ref({
  rawPassword: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
    {min: 6, message: '旧密码至少6位', trigger: 'blur'}
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, message: '新密码至少6位', trigger: 'blur'}
  ],
})
const openDialog = () => {
  centerDialogVisible.value = true
}
const updatePassword = async () => {
  await _updatePassword(passwordForm.value).then(res => {
    if (res.success) {
      successMsg("修改成功,请重新登录")
      removeToken()
      userStore.logout()
      closeDialog()
      router.push({path: "/login"})
    }
  })
}
const closeDialog = () => {
  passwordForm.value = {
    rawPassword: "",
    newPassword: ""
  }
  centerDialogVisible.value = false
}

const nicknameDTO = ref({
  nickname: userStore.user.nickname
})
const updateNickname = () => {
  _updateNickname(nicknameDTO.value).then(res => {
    if ( res.success ) {
      userStore.setNickname(nicknameDTO.value.nickname)
      successMsg("修改成功")
    }
  })
}

</script>

<template>
  <div class="info-card">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <el-upload
              class="avatar-uploader"
              :action="UP_LOAD_URL"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="head"
          >
            <el-image :src="userStore.user.avatar" fit="fill"/>
          </el-upload>
          <template #footer>
            <label>联系邮箱：{{ userStore.user.email }}</label>
          </template>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h1 style="text-align: center">个人信息</h1>
            </div>
          </template>
          <div class="demo-input-suffix">
            <el-row :gutter="20">
              <el-col :span="2">
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">用戶名</span>
              </el-col>
              <el-col :span="8">
                <el-input
                    disabled
                    v-model="userStore.user.username"
                    class="w-50 m-2"
                    placeholder="Pick a date"
                />
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="2">
                <span class="ml-3 w-35 text-gray-600 inline-flex items-center">昵称</span>
              </el-col>
              <el-col :span="8">
                <el-input
                    v-model="nicknameDTO.nickname"
                    class="w-50 m-2"
                    placeholder="Pick a date"
                />
              </el-col>
              <el-col :span="4">
                <el-button @click="updateNickname">修改</el-button>
              </el-col>
            </el-row>
          </div>
          <template #footer>
            <div>
              <el-icon size="small" style="margin-right: 10px">
                <Lock/>
              </el-icon>
              修改密码
              <el-button style="float:right; margin-top: -5px" @click="openDialog">修改密码</el-button>
            </div>
          </template>
        </el-card>

      </el-col>
    </el-row>
    <el-dialog
        v-model="centerDialogVisible"
        title="修改密码"
        width="30%"
        align-center
    >
      <el-form
          ref="ruleFormRef"
          class="register-form-self"
          label-position="right"
          label-width="100px"
          :modal="true"
          close="closeDialog"
          :rules="ruleForm"
          :model="passwordForm"
      >
        <el-form-item label="旧密码" prop="rawPassword">
          <el-input type="password" show-password v-model="passwordForm.rawPassword"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" show-password v-model="passwordForm.newPassword"/>
        </el-form-item>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="updatePassword">
          修改
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>


</template>

<style scoped>
.info-card {
  width: 80%;
  margin: 20px auto;
}
</style>