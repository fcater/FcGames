import BASE_URL from "../constants/baseURL";
import { GAME_CATEGORIES } from "../constants/gameCategories";
import { Game } from "../types";

const getGameDiscount = (discount: number): number | null => {
  return discount <= 1 ? discount * 100 : null;
};

const getGamePoster = (posterPath: string): string => {
  return posterPath ? BASE_URL.API + posterPath : "/public/defaultPoster.jpg";
};

const getCategoriesValue = (category: string): string => {
  return (GAME_CATEGORIES as Record<string, string>)[category];
};

const getManageGameRequestBody = (form: Game) => {
  const data = { ...form };
  delete data.id;
  delete data.discountedPrice;
  data.discount /= 100;

  return data;
};

export {
  getGameDiscount,
  getGamePoster,
  getCategoriesValue,
  getManageGameRequestBody,
};
