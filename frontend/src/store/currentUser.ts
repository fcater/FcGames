import { defineStore } from "pinia";

import { Game } from "../types";
import httpService from "../services/httpService";
import authService from "../services/authService";

export const useCurrentUser = defineStore({
  id: "currentUser",
  state: () => ({
    id: 0,
    username: "",
    isAdmin: false,
    accountBalance: 0,
    games: [] as Number[],
  }),
  actions: {
    async fetchUser() {
      if (authService.getJwt()) {
        const { data: user } = await httpService.get("/api/parseToken");
        const { data: newUser } = await httpService.get(`/api/user/${user.id}`);
        const { data } = await httpService.get(`/api/userGames/${user.id}`);

        this.$patch({ ...user, ...newUser, games: data.map((g) => g.id) });
      }
    },
  },
});
