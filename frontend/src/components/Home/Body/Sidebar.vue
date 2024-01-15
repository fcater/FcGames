<template>
  <div class="home-sidebar" v-if="gameCategories.length > 0">
    <el-tabs
      v-model="activeTab"
      :tab-position="tabPosition"
      @tab-change="handleTabChange"
    >
      <el-tab-pane label="所有" name="all" />
      <el-tab-pane
        v-for="category in gameCategories"
        :key="category"
        :name="category"
        :label="getCategoriesValue(category)"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGameListStates } from "../../../store/gameListStates";
import httpService from "../../../services/httpService";
import { GAME_CATEGORIES } from "../../../constants/gameCategories";
import { getCategoriesValue } from "../../../utilities";

const gameListStates = useGameListStates();
const tabPosition = ref("left");
const gameCategories = ref<GAME_CATEGORIES[] | []>([]);

const activeTab = gameListStates.category || "all";

const handleTabChange = (tabName: string) => {
  const category = tabName !== "all" ? (tabName as GAME_CATEGORIES) : null;
  gameListStates.setCategory(category);
};

onMounted(() => {
  httpService
    .get("api/game/categories")
    .then(({ data }) => (gameCategories.value = data))
    .catch((error) => console.error("获取失败:", error));
});
</script>

<style scoped>
.home-sidebar {
  position: sticky;
  top: 6.5rem;
  margin-right: 3rem;
  align-self: flex-start;
  user-select: none;
}
:deep(.el-tabs__item) {
  color: #999;
}
</style>
