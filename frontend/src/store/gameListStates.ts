import { defineStore } from "pinia";

import { GAME_CATEGORIES } from "../constants/gameCategories";

export type CATEGORY = GAME_CATEGORIES | null;

export const useGameListStates = defineStore({
  id: "gameListStates",
  state: () => ({
    category: null as CATEGORY,
    viewChart: true,
    manageMode: false,
  }),
  actions: {
    setCategory(category: CATEGORY) {
      this.category = category;
    },
    setViewChart(check: boolean) {
      this.viewChart = check;
    },
    setManageGame(check: boolean) {
      this.manageMode = check;
    },
  },
});
