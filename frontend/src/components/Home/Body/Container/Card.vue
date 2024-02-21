<template>
  <el-card class="card" :style="{ width: showList ? '100%' : '' }">
    <img
      :src="getGamePoster(props.game.poster)"
      class="image"
      :style="{
        width: showList ? '8rem' : '100%',
        height: showList ? '4rem' : '14rem',
        marginRight: showList ? '1rem' : '0',
      }"
      @click="redirectToGameDetails"
    />
    <div
      class="text"
      :style="{ color: props.showList ? '#999' : '#fff' }"
      @click="redirectToGameDetails"
    >
      <p>{{ props.game.title }}</p>
      <div class="sub-title">
        <PriceLabel :game="props.game" />
      </div>
    </div>
    <div
      class="description"
      v-if="!props.showList && !states.viewChart"
      :style="{ height: showList ? '4rem' : '100%' }"
      @click="handleCart"
    >
      {{ game.description }}
    </div>
    <div class="actions" v-if="!currentUser.games.includes(props.game.id)">
      <el-button
        v-if="states.manageMode"
        type="warning"
        :icon="Edit"
        circle
        @click="handleEditGame"
      />
      <div v-else>
        <el-button
          :type="addedToCart ? 'info' : 'success'"
          :icon="addedToCart ? Remove : ShoppingCart"
          circle
          @click="handleCart"
        />
        <el-tooltip
          :disabled="!noMoney"
          class="box-item"
          effect="dark"
          content="余额不足！"
          placement="top"
        >
          <el-button
            class="buy-game-button"
            :disabled="noMoney"
            type="warning"
            :icon="WalletFilled"
            circle
            @click="handleBuyGame"
          />
        </el-tooltip>
      </div>
    </div>
    <el-tag v-else class="actions already-have" type="success">已拥有</el-tag>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Edit,
  ShoppingCart,
  WalletFilled,
  Remove,
} from "@element-plus/icons-vue";

import router from "../../../../router";
import { getGamePoster } from "../../../../utilities";
import PriceLabel from "../../../Common/PriceLabel.vue";
import { useGameListStates } from "../../../../store/gameListStates";
import { useGameCart } from "../../../../store/gameCart";
import { useCurrentUser } from "../../../../store/currentUser";

const states = useGameListStates();
const currentUser = useCurrentUser();
const gameCart = useGameCart();
const emit = defineEmits(["onManageGame"]);
const props = defineProps(["game", "showList"]);

const showList = computed(() => !states.viewChart || props.showList);
const addedToCart = computed(() =>
  gameCart.cart.some(({ id }) => id === props.game.id)
);
const noMoney = computed(
  () => currentUser.accountBalance < props.game.discountedPrice
);

const handleEditGame = () => emit("onManageGame", props.game);

const redirectToGameDetails = () => {
  if (states.manageMode) handleEditGame();
  else router.push(`game?id=${props.game.id}`);
};

const handleCart = (e: Event) => {
  if (states.manageMode) {
    handleEditGame();
    return;
  }
  e.stopPropagation();
  const game = { ...props.game };
  if (addedToCart.value) gameCart.removeFromCart(game);
  else gameCart.addToCart(game);
};

const handleBuyGame = (e: Event) => {
  e.stopPropagation();
  gameCart.setSingleGame({ ...props.game });
};
</script>

<style scoped>
.card {
  display: flex;
  cursor: pointer;
  box-shadow: none !important;
  border: none;
  width: 25rem;
  padding: 0;
  background-color: transparent;
  flex: 1;
}

:deep(.el-card__body) {
  padding: 0.5rem !important;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.image {
  border-radius: 5px;
  background-color: transparent;
  transition: all 0.2s;
}
.image:hover {
  opacity: 0.8;
}
.text {
  text-align: start;
  flex: 1;
  text-wrap: nowrap;
}
.text > p {
  margin: 0.25rem 0;
}
.sub-title {
  display: flex;
  align-items: center;
}
.sub-title > button {
  margin-left: auto;
}
.description {
  flex: 4.5;
  height: 100%;
  text-align: start;
  padding-top: 0.25rem;
  padding-left: 0.25rem;
}
.description:hover {
  color: #888;
}
.actions {
  text-align: end;
  margin-top: auto;
  margin-bottom: 0.25rem;
}
</style>
