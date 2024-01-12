<template>
  <div class="toolbar">
    <el-input v-model="search" placeholder="搜索商城" class="search">
      <template #prepend size="30">
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-switch
      size="large"
      inline-prompt
      class="switch"
      v-model="states.viewChart"
      @change="(check:boolean) => states.setViewChart(check)"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #409eff"
      :active-icon="Grid"
      :inactive-icon="Expand"
    />

    <el-button
      id="manageMode"
      :type="states.manageMode ? 'danger' : 'info'"
      v-if="currentUser.isAdmin"
      @click="states.setManageGame(!states.manageMode)"
    >
      <el-icon size="20">
        <Setting />
      </el-icon>
      <p>
        {{ states.manageMode ? "退出" : "管理游戏" }}
      </p>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Grid, Expand } from "@element-plus/icons-vue";
import { Search } from "@element-plus/icons-vue";
import authService from "../../services/authService";
import { useGameListStates } from "../../store/gameListStates";

const search = ref("");
const states = useGameListStates();

const currentUser = authService.getCurrentUser();
</script>

<style scoped>
.switch {
  margin-right: 1rem;
}
.toolbar {
  padding: 2rem 15rem;
  align-items: center;
  display: flex;
  background: rgb(18, 18, 18);
  position: sticky;
  top: -1px;
  z-index: 999;
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
