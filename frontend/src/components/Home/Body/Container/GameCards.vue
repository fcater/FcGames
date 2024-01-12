<template>
  <div v-if="props.loading" class="loading"><p>正在读取数据库...</p></div>
  <div
    v-for="game in props.games"
    v-else-if="props.games.length > 0"
    :style="{ width: states.viewChart ? '' : '100%' }"
  >
    <Card
      :game="game"
      @onManageGame="(game:Game) => emit('onManageGame', game)"
    />
  </div>
  <div v-else class="no-data"><p>数据库中没有数据！</p></div>
</template>

<script setup lang="ts">
import { Game } from "../../../../types";
import { useGameListStates } from "../../../../store/gameListStates";

import Card from "./Card.vue";

const emit = defineEmits(["onManageGame"]);
const props = defineProps(["loading", "games"]);
const states = useGameListStates();
</script>

<style scoped>
.loading,
.no-data {
  margin: 0;
  height: 18.625rem;
}
</style>
