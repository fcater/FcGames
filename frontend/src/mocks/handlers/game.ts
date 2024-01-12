import { HttpResponse, http } from "msw";
import BASE_URL from "../../constants/baseURL";
import { Game } from "../../types";
import { GAME_CATEGORIES } from "../../constants/gameCategories";
import { getCategoriesValue } from "../../utilities";

const GAMES: Game[] = [
  {
    id: "1",
    title: "超级马里奥：奥德赛",
    poster: "",
    description:
      "玩家在游戏中将扮演马力欧，为了阻止掳走桃花公主并企图与她结婚的酷霸王，玩家将与途中邂逅的凯皮一起在各种各样的世界里冒险。",
    categories: GAME_CATEGORIES.PUZZLE,
    price: 200.0,
    discount: 1.0,
    discountedPrice: 0.0,
  },
  {
    id: "2",
    title: "赛博朋克 2077",
    poster: "poster/mockPoster.jpg",
    description:
      "《赛博朋克 2077》的故事发生在夜之城，权力更迭和身体改造是这里不变的主题。玩家将扮演一名野心勃勃的雇佣兵：V，追寻一种独一无二的植入体——获得永生的关键。自定义角色义体、技能和玩法，探索包罗万象的城市。",
    categories: GAME_CATEGORIES.OPEN_WORLD,
    price: 500,
    discount: 0.9,
    discountedPrice: 50,
  },
];

const CATEGORIES = [
  "STRATEGY",
  "PUZZLE",
  "RACING",
  "OPEN_WORLD",
  "MUSIC",
  "SPORTS",
  "ROGUE_LIKE",
];

export const gameHandlers = [
  http.get(BASE_URL.API + "api/games", ({ request }) => {
    const categories = new URL(request.url).searchParams.get("categories");
    if (categories) {
      const filteredGames = GAMES.filter((g) => {
        return g.categories === getCategoriesValue(categories);
      });
      return HttpResponse.json(filteredGames);
    } else return HttpResponse.json(GAMES);
  }),
  http.get(BASE_URL.API + "api/games", ({ request }) => {
    const categories = new URL(request.url).searchParams.get("categories");
    const filteredGames = GAMES.filter((g) => g.categories === categories);
    return HttpResponse.json(categories ? filteredGames : GAMES);
  }),
  http.get(BASE_URL.API + "api/game/:id", ({ params }) => {
    const game = GAMES.find(({ id }) => id === params.id);
    return HttpResponse.json(game);
  }),
  http.get(BASE_URL.API + "api/games/categories", () =>
    HttpResponse.json(CATEGORIES)
  ),
  http.post(BASE_URL.API + "api/games/add", async ({ request }) => {
    const game = (await request.json()) as Game;
    game.id = Date.now().toString(36);
    game.discountedPrice = (game.price * (100 - game.discount * 100)) / 100;
    GAMES.push(game);
    return HttpResponse.json("添加成功");
  }),
  http.patch(BASE_URL.API + "api/game/:id", async ({ params, request }) => {
    const origin = GAMES.find(({ id }) => id === params.id);
    const game = (await request.json()) as Game;
    game.discountedPrice = (game.price * (100 - game.discount * 100)) / 100;
    if (origin) {
      for (const key in origin) {
        origin[key] = game[key];
      }
    }
    return HttpResponse.json("更新成功");
  }),
  http.delete(BASE_URL.API + "api/game/:id", ({ params }) => {
    const index = GAMES.findIndex(({ id }) => id === params.id);
    if (index !== -1) GAMES.splice(index, 1);
    return HttpResponse.json("删除成功");
  }),
];
