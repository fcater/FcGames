import { defineStore } from "pinia";
import { Game } from "../types/Game";

type GAME = Game | null;

export const useGameCart = defineStore({
  id: "gameCart",
  state: () => ({
    cart: [] as Game[],
    singleGame: null as GAME,
  }),
  actions: {
    setSingleGame(game: GAME) {
      this.singleGame = game;
    },
    addToCart(game: Game) {
      this.cart.push(game);
    },
    removeFromCart(game: GAME) {
      const i = this.cart.findIndex(({ id }) => id === game?.id);
      if (i > -1) this.cart.splice(i, 1);
    },
    clearCart() {
      this.cart = [];
    },
  },
});
