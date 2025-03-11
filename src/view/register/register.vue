<script setup>
import {ref} from "vue"
import {errorMsg, successMsg} from "@/util/box.js";
import {register} from "@/api/user/user.js";
import {useRouter} from "vue-router";

const router = useRouter()
const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  gender: "男"
})

const isEmail = (email) => {
  if (email.indexOf("@") === -1) {
    errorMsg("邮箱格式不合法,必须包含 @")
    return;
  }
  if (email.indexOf(".") === -1) {
    errorMsg("邮箱格式不合法,必须包含 .")
  }
}
const ruleForm = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 16, message: '用户名应为3-16为', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, message: '密码至少6位', trigger: 'blur'},
  ],
  confirmPassword: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {min: 6, message: '密码至少6位', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
  ]
})
const toRegister = () => {
  register(registerForm.value).then(res => {
    if (res.success) {
      successMsg("注册成功,跳转到登录页面")
      router.push({path: "/login"})
    }
  })
}
const ruleFormRef = ref()
const validateRegister = (formEl) => {
  formEl.validate((valid, _) => {
    if (valid) {
      toRegister()
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
              :model="registerForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input show-password v-model="registerForm.password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input show-password v-model="registerForm.confirmPassword"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input @blur="isEmail(registerForm.email)" type="email" v-model="registerForm.email"/>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="registerForm.gender">
                <el-radio label="男"/>
                <el-radio label="女"/>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-button @click="validateRegister(ruleFormRef)" class="register-button">注册</el-button>
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