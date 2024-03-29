import { GAME_CATEGORIES } from "../constants/gameCategories";

export interface Game {
  id?: number;
  title: string;
  description: string;
  categories: GAME_CATEGORIES | null;
  poster: string;
  price: number;
  discount: number;
  discountedPrice?: number;
  [key: string]: any;
}

export const defaultEmptyGame: Game = {
  id: 0,
  title: "",
  description: "",
  poster: "",
  categories: GAME_CATEGORIES.STRATEGY,
  price: 0,
  discount: 0,
  discountedPrice: 0,
};
