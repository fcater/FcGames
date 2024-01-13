import { defineStore } from "pinia";

import { GAME_CATEGORIES } from "../constants/gameCategories";

export type CATEGORY = GAME_CATEGORIES | null;

export const useGameListStates = defineStore({
  id: "gameListStates",
  state: () => ({
    searchTitle: "",
    category: null as CATEGORY,
    viewChart: true,
    manageMode: false,
  }),
  actions: {
    setSearchTitle(str: string) {
      this.searchTitle = str;
    },
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
