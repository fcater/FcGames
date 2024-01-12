<template>
  <el-card v-if="game" class="card">
    <img :src="getGamePoster(game.poster)" class="image" />
    <div class="text">
      <p class="title">{{ game.title }}</p>
      <div class="sub-title">
        <PriceLabel :game="game" />
      </div>
      <p class="description">
        {{ game.description }}
      </p>
      <div class="actions">
        <el-button class="purchage" type="danger"
          >购买 <el-icon><Wallet /></el-icon
        ></el-button>
        <el-button type="success"
          >加入购物车 <el-icon><ShoppingCart /></el-icon
        ></el-button>
      </div>
    </div>
  </el-card>
  <div v-else>
    <p>正在读取游戏数据...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Wallet } from "@element-plus/icons-vue";

import { Game } from "../types";
import httpService from "../services/httpService";
import { getGamePoster, getUrlQuery } from "../utilities";
import PriceLabel from "../components/Common/PriceLabel.vue";

const game = ref<Game | null>(null);

onMounted(() => {
  const query = getUrlQuery();
  httpService
    .get(`api/game/${query.get("id")}`)
    .then(({ data }) => (game.value = data))
    .catch((error) => console.error("获取失败:", error));
});
</script>

<style scoped>
.image {
  display: inline-block;
  width: 40rem;
}
.card {
  box-shadow: none !important;
  border: none;
  background-color: transparent;
  color: aliceblue;
}
:deep(.el-card__body) {
  display: flex;
}
.text {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  margin: 2rem;
  margin-bottom: 0;
  flex: 1;
}
.title {
  margin-top: 0;
}
.sub-title {
  display: flex;
  align-items: center;
}
.actions {
  margin-top: auto;
}
.actions > button {
  display: block;
  width: 100%;
  margin-left: 0 !important;
}
:deep(.el-icon) {
  margin-left: 0.25rem;
}
.purchage {
  margin-bottom: 1rem;
  padding: 1rem;
  height: fit-content;
}
</style>
