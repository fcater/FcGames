<template>
  <div class="loginBackround">
    <Logo />
    <h6>登录或注册</h6>
    <el-form :model="form" label-width="65px">
      <el-form-item label="用户名" required>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item class="error">
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </el-form-item>
      <el-form-item>
        <el-button class="login" type="primary" @click="onLogin" :disabled="!isFormValid">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="register" @click="onRegister" :disabled="!isFormValid">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="divider">
      <div>
        <p>或通过下列方式登录</p>
      </div>
    </div>
    <span v-for="(avatar, index) in authService.avatars" :key="index" v-html="avatar" class="otherPlatform" />
    <p class="footer">登录或注册即代表您同意我们的 隐私政策</p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";

import Logo from "../assets/Logo.vue";
import authService from "../services/authService";

const form = reactive({ username: "", password: "" });

const isFormValid = computed(() => {
  return form.username !== "" && form.password !== "";
});

const errorMessage = ref("");

const ApiFailed = (err: string) => (errorMessage.value = err);

const onLogin = () => authService.login(form).catch(ApiFailed);
const onRegister = () => authService.register(form).catch(ApiFailed);

watch(form, () => (errorMessage.value = ""));
</script>

<style scoped>
:deep(.el-form-item__label) {
  color: #fff;
}

.error {
  margin: 0;
}

.error>div>p {
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

.loginBackround>h6 {
  font-size: 1.125rem;
  color: #fff;
}

.divider {
  margin-top: 40px;
  color: white;
}

.divider>div {
  margin: 0px;
  flex-shrink: 0;
  display: flex;
  white-space: nowrap;
  text-align: center;
  border: 0px;
}

.divider>div::before,
.divider>div::after {
  width: 100%;
  content: "";
  align-self: center;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.divider>div>p {
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
