import { HttpResponse, http } from "msw";

import { GAMES } from "./game";
import BASE_URL from "../../constants/baseURL";
import { Game } from "../../types";

const USER_GAMES: Game[] = [];

export const userGamesHandlers = [
  http.get(BASE_URL.API + "api/userGames/:id", () => {
    return HttpResponse.json(USER_GAMES);
  }),
  http.post(BASE_URL.API + "api/userGames/:id?gameIds=", ({ request }) => {
    const query = new URL(request.url).searchParams;
    const gameIds = query.get("gameIds")?.split(",").map(Number);
    const games = GAMES.filter(({ id }) => gameIds?.includes(id!));
    USER_GAMES.push(...games);
    return HttpResponse.json("购买成功");
  }),
];
