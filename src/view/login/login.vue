<script setup>
import { ref } from "vue"
import { login } from "../../api/user/user.js";
import { useUserStore } from "../../store/user.js";
import {setToken} from "../../util/auth.js";
import {useRouter} from "vue-router";
import {successMsg} from "../../util/box.js";

const router = useRouter()
const userStore = useUserStore()
const loginForm = ref({
  username: "",
  password: "",
})

const ruleForm = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
const toLogin = async () => {
  await login(loginForm.value).then(res => {
    if ( res.success ) {
      successMsg("登录成功")
      setToken(res.data.user.token)
      userStore.setUser(res.data.user)
      userStore.setIsLogin()
      userStore.setAvatar(res.data.user.avatar)
      router.push({path: "/index"})
    }
  })
}
const ruleFormRef = ref()

const validateLogin = async (formEl) => {
  await formEl.validate((valid, _) => {
    if (valid) {
      toLogin();
    }
  })
}
</script>

<template>
  <el-row>
    <el-col class="register-board">
      <el-card shadow="always" class="register-card">
        <div>
          <el-form
              ref="ruleFormRef"
              class="register-form-self"
              label-position="right"
              label-width="100px"
              :rules="ruleForm"
              :model="loginForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" show-password v-model="loginForm.password" />
            </el-form-item>
          </el-form>
          <el-button @click="validateLogin(ruleFormRef)" class="register-button">登录</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.register-board {
  display: flex;
  margin-top: 10%;
  justify-content: center;
  align-items: center;
}
.register-card {
  width: 40%;
}
.register-form-self {
  width: 90%;
}
.register-button {
  float: right;
  margin-right: 10%;
  margin-bottom: 20px;
}
</style>