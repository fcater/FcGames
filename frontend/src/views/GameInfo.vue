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
      <div class="actions" v-if="!currentUser.games.includes(game?.id || 0)">
        <el-tooltip
          :disabled="!noMoney"
          class="box-item"
          effect="dark"
          content="余额不足！"
          placement="top"
        >
          <el-button
            :disabled="noMoney"
            class="purchage"
            type="danger"
            @click="handleBuy"
            >购买 <el-icon><Wallet /></el-icon></el-button
        ></el-tooltip>
        <el-button v-if="!isInCart" type="success" @click="handleCart"
          >加入购物车 <el-icon><ShoppingCart /></el-icon
        ></el-button>
        <el-button v-else type="info" @click="handleCart"
          >从购物车移除 <el-icon><Remove /></el-icon
        ></el-button>
      </div>
      <el-tag v-else class="actions already-have" type="success">已拥有</el-tag>
    </div>
  </el-card>
  <div v-else>
    <p>正在读取游戏数据...</p>
  </div>

  <BuyModal />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Wallet } from "@element-plus/icons-vue";

import { Game } from "../types";
import { useGameCart } from "../store/gameCart";
import httpService from "../services/httpService";
import { useCurrentUser } from "../store/currentUser";
import { getGamePoster, getUrlQuery } from "../utilities";
import PriceLabel from "../components/Common/PriceLabel.vue";
import BuyModal from "../components/Common/BuyModal.vue";

const query = getUrlQuery();
const gameId = query.get("id");
const game = ref<Game | null>(null);
const currentUser = useCurrentUser();
const gameCart = useGameCart();

const isInCart = computed(() =>
  gameCart.cart.some(({ id }) => id?.toString() === gameId)
);

const noMoney = computed(
  () => currentUser.accountBalance < (game.value?.discountedPrice || 0)
);

const handleBuy = () => {
  if (game.value) gameCart.setSingleGame(game.value);
};

const handleCart = () => {
  if (game.value) {
    if (isInCart.value) gameCart.removeFromCart(game.value);
    else gameCart.addToCart(game.value);
  }
};

onMounted(() => {
  httpService
    .get(`api/game/${gameId}`)
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
