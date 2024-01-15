<template>
  <div class="games-container">
    <AddGameCard @onManageGame="handleManageGame" />
    <GameCards
      :loading="loading"
      :games="games"
      @onManageGame="handleManageGame"
    />
    <ManageGameModal
      :game="manageGame"
      @onManageGame="handleManageGame"
      @onFetchGames="fetchGames"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { Game } from "../../../../types";
import ManageGameModal from "../ManageGameModal/index.vue";
import AddGameCard from "./AddGameCard.vue";
import GameCards from "./GameCards.vue";
import { useGameListStates } from "../../../../store/gameListStates";
import httpService from "../../../../services/httpService";

const loading = ref(false);
const games = ref<Game[] | []>([]);
const manageGame = ref<Game | {} | null>(null);

const states = useGameListStates();

const handleManageGame = (game: Game) => (manageGame.value = game);

const fetchGames = () => {
  const queries = [
    states.searchTitle ? `titleLike=${states.searchTitle}` : "",
    states.category ? `categories=${states.category}` : "",
  ].filter(Boolean);
  const queryString = queries.length > 0 ? "?" + queries.join("&") : "";

  loading.value = true;
  httpService
    .get(`api/game${queryString}`)
    .then(({ data }) => (games.value = data))
    .catch((error) => console.error("获取失败:", error))
    .finally(() => (loading.value = false));
};

watchEffect(() => fetchGames());
</script>

<style scoped>
.games-container {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;
  height: fit-content;
}
</style>
