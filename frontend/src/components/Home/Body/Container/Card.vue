<template>
  <el-card
    class="card"
    @click="handleClickCard"
    :style="{ width: states.viewChart ? '' : '100%' }"
  >
    <img
      :src="getGamePoster(props.game.poster)"
      class="image"
      :style="{
        width: states.viewChart ? '100%' : '8rem',
        height: states.viewChart ? '14rem' : '4rem',
        marginRight: states.viewChart ? '0' : '1rem',
      }"
    />
    <div class="text">
      <p>{{ props.game.title }}</p>
      <div class="sub-title">
        <PriceLabel :game="props.game" />
      </div>
    </div>
    <div
      class="description"
      v-if="!states.viewChart"
      :style="{ height: states.viewChart ? '100%' : '4rem' }"
    >
      {{ game.description }}
    </div>
    <div class="actions">
      <el-button v-if="states.manageMode" type="warning" :icon="Edit" circle />
      <el-button
        v-else
        type="info"
        :icon="ShoppingCart"
        circle
        @click="handleCart"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Edit, ShoppingCart } from "@element-plus/icons-vue";

import router from "../../../../router";
import { getGamePoster } from "../../../../utilities";
import PriceLabel from "../../../Common/PriceLabel.vue";
import { useGameListStates } from "../../../../store/gameListStates";

const emit = defineEmits(["onManageGame"]);
const states = useGameListStates();
const props = defineProps(["game"]);

const handleEditGame = () => {
  emit("onManageGame", props.game);
};

const handleClickCard = () => {
  if (states.manageMode) handleEditGame();
  else router.push(`game?id=${props.game.id}`);
};

const handleCart = (e: Event) => {
  e.stopPropagation();
  console.log("购物车");
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
  color: #fff;
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
  flex: 5;
  height: 100%;
  text-align: start;
  padding-top: 0.25rem;
  padding-left: 0.25rem;
}
.actions {
  text-align: end;
  margin-top: auto;
}
</style>
