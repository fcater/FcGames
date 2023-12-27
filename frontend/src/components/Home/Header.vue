<template>
  <header class="header">
    <Logo class="header-logo" />
    <span class="divider" />
    <span class="content"> STORE </span>
    <el-dropdown>
      <span class="avatar" v-html="avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="authService.logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-button type="primary">下载</el-button>
  </header>
  <div class="toolbar">
    <el-input v-model="search" placeholder="搜索商城" class="search">
      <template #prepend size="30">
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-button type="primary" plain>

      <el-icon size="20">
        <Grid />
      </el-icon>
      <p>图表</p>
    </el-button>

    <el-button type="primary" plain>
      <el-icon size="20">
        <Expand />
      </el-icon>
      <p>列表</p>
    </el-button>

    <el-button type="primary" plain v-if="currentUser.isAdmin">
      <el-icon size="20">
        <CirclePlus />
      </el-icon>
      <p>新增</p>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import multiavatar from "@multiavatar/multiavatar";
import { Search } from "@element-plus/icons-vue";

import Logo from "../../assets/Logo.vue";
import authService from "../../services/authService";
import { ref } from "vue";

const search = ref("");

const currentUser = authService.getCurrentUser()
const avatar = multiavatar(currentUser.username);
</script>

<style scoped>
.divider {
  display: inline-block;
  height: 2rem;
  border: #303034 1px solid;
  margin: 0 1rem;
}

.content {
  flex: 1;
  text-align: left;
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
}

.toolbar {
  padding: 2rem 10rem;
  align-items: center;
  display: flex;
  background: rgb(18, 18, 18);
  position: sticky;
  top: 0;
}

.search {
  width: 16rem;
  background: black;
  padding: 0;
  overflow: hidden;
  border-radius: 2rem;
  margin-right: 1rem;
}
</style>
