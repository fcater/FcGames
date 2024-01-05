<template>
  <div class="loginBackround">
    <Logo />
    <h6>登录或注册</h6>
    <el-form :model="form" label-width="65px">
      <el-form-item label="用户名" required>
        <el-input v-model="form.username" id="username" />
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="form.password" type="password" id="password" />
      </el-form-item>
      <el-form-item class="error">
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login"
          type="primary"
          @click="onLogin"
          :disabled="!isFormValid"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button class="register" @click="onRegister" :disabled="!isFormValid"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
    <div class="divider">
      <div>
        <p>或通过下列方式登录</p>
      </div>
    </div>
    <span
      v-for="(avatar, index) in authService.avatars"
      :key="index"
      v-html="avatar"
      class="otherPlatform"
    />
    <p class="footer">登录或注册即代表您同意我们的 隐私政策</p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { AxiosResponse } from "axios";

import Logo from "../assets/Logo.vue";
import authService from "../services/authService";
import { ElNotification } from "element-plus";
import localStorageKeys from "../constants/localStorageKeys";
import { LoginForm } from "../types/LoginForm";
import { AUTH_MESSAGE_TIME } from "../constants/delay";

const form = reactive({ username: "", password: "" });
const errorMessage = ref("");

watch(form, () => (errorMessage.value = ""));

const handleAPI = async (
  api: (form: LoginForm) => Promise<AxiosResponse<any, any>>,
  form: LoginForm,
  title: string
) => {
  try {
    const { data: user } = await api(form);
    localStorage.setItem(localStorageKeys.USER, JSON.stringify(user));
    ElNotification({ title, type: "success", position: "top-left" });
    setTimeout(() => (location.href = "/"), AUTH_MESSAGE_TIME);
  } catch (error: any) {
    errorMessage.value = error?.response?.data;
  }
};

const onLogin = () => handleAPI(authService.login, form, "登陆成功");

const onRegister = () => handleAPI(authService.register, form, "注册成功");

const isFormValid = computed(() => {
  return form.username !== "" && form.password !== "";
});
</script>

<style scoped>
:deep(.el-form-item__label) {
  color: #fff;
}

.error {
  margin: 0;
}

.error > div > p {
  color: coral;
  margin: 0;
}

.login,
.register {
  width: 100%;
  padding: 1.5rem;
}

.login {
  margin-top: 1rem;
}

.logo {
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(255, 255, 255);
}

.loginBackround {
  max-width: 420px;
  width: 100%;
  background-color: #202020;
  margin: 2rem auto;
  padding: 50px 55px 60px;
}

.loginBackround > h6 {
  font-size: 1.125rem;
  color: #fff;
}

.divider {
  margin-top: 40px;
  color: white;
}

.divider > div {
  margin: 0px;
  flex-shrink: 0;
  display: flex;
  white-space: nowrap;
  text-align: center;
  border: 0px;
}

.divider > div::before,
.divider > div::after {
  width: 100%;
  content: "";
  align-self: center;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.divider > div > p {
  color: rgba(255, 255, 255, 0.72);
  margin: 0 10px;
}

.otherPlatform {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
}

.footer {
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
  margin-top: 40px;
}
</style>
