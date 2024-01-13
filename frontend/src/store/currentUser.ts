import { defineStore } from "pinia";
import httpService from "../services/httpService";
import authService from "../services/authService";

export const useCurrentUser = defineStore({
  id: "currentUser",
  state: () => ({
    id: 0,
    username: "",
    isAdmin: false,
    accountBalance: 0,
  }),
  actions: {
    async fetchUser() {
      if (authService.getJwt()) {
        const { data } = await httpService.get("/api/parseToken");
        this.$patch({ ...data });
      }
    },
  },
});
