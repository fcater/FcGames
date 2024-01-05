<template>
  <header v-if="user?.token" class="header">
    <Logo class="header-logo" @click="gotoHOme" />
    <span class="divider" />
    <span class="store" @click="gotoHOme"> STORE </span>
    <el-dropdown class="user-header">
      <span class="avatar" v-html="avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ user?.username }}</el-dropdown-item>
          <el-dropdown-item v-if="user?.isAdmin" @click="gotoManageUsers">
            管理用户
          </el-dropdown-item>
          <el-dropdown-item @click="onLogout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-button type="primary">下载</el-button>
  </header>
</template>

<script setup lang="ts">
import multiavatar from "@multiavatar/multiavatar";
import { ElNotification } from "element-plus";

import router from "../../router";
import Logo from "../../assets/Logo.vue";
import authService from "../../services/authService";
import { AUTH_MESSAGE_TIME } from "../../constants/delay";

const user = authService.getCurrentUser();
const avatar = multiavatar(user.username || "");
const gotoManageUsers = () => router.push("/users");
const gotoHOme = () => router.push("/home");

const onLogout = () => {
  authService.logout();
  ElNotification({ title: "已退出", type: "success", position: "top-left" });
  setTimeout(() => (location.href = "/"), AUTH_MESSAGE_TIME);
};
</script>

<style scoped>
.divider {
  display: inline-block;
  height: 2rem;
  border: #303034 1px solid;
  margin: 0 1rem;
}

.store {
  flex: 1;
  text-align: left;
  cursor: pointer;
}

.avatar {
  display: flex;
  width: 2rem;
  border-radius: 50%;
  margin-right: 2rem;
}

.header {
  font-size: 20px;
  font-weight: bolder;
  color: #fff;
  align-items: center;
  background-color: #18181c;
  display: flex;
  padding: 10px 20px;
}

.header-logo {
  margin: 0;
  transform: scale(0.6);
  cursor: pointer;
}
</style>
