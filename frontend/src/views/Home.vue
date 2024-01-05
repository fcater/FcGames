
<template>
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
  <p style="height: 100vh;">Body</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from "@element-plus/icons-vue";
import authService from '../services/authService';

const search = ref("");
const currentUser = authService.getCurrentUser()
</script>


<style scoped>
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