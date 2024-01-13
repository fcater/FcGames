<template>
  <header v-if="currentUser.username" class="header">
    <Logo class="header-logo" @click="gotoHome" />
    <span class="divider" />
    <span class="store" @click="gotoHome"> STORE </span>
    <el-dropdown class="user-header">
      <span class="avatar" v-html="multiavatar(currentUser.username)" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ currentUser.username }}</el-dropdown-item>
          <el-dropdown-item v-if="currentUser.isAdmin" @click="gotoManageUsers">
            管理用户
          </el-dropdown-item>
          <el-dropdown-item @click="onLogout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button @click="currentUser.fetchUser()" type="primary">下载</el-button>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import multiavatar from "@multiavatar/multiavatar";

import router from "../../router";
import Logo from "../../assets/Logo.vue";
import toast from "../../constants/toast";
import authService from "../../services/authService";
import { useCurrentUser } from "../../store/currentUser";
import { AUTH_MESSAGE_TIME } from "../../constants/delay";

const currentUser = useCurrentUser();

const gotoManageUsers = () => router.push("/users");
const gotoHome = () => router.push("/home");
const onLogout = () => {
  authService.logout();
  toast.success("已退出");
  setTimeout(() => (location.href = "/"), AUTH_MESSAGE_TIME);
};

onMounted(() => currentUser.fetchUser());
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
