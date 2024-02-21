import { HttpResponse, http } from "msw";

import { ADMIN, USER } from "./auth";
import { User } from "../../types";
import BASE_URL from "../../constants/baseURL";
import authService from "../../services/authService";

const USERS = [
  ADMIN,
  USER,
  {
    id: 2,
    username: "frank",
    accountBalance: 1200,
    isAdmin: false,
    token: "mockToken",
  },
];

export const userHandlers = [
  http.get(BASE_URL.API + "api/user/:id", () => {
    switch (authService.getJwt()) {
      case "mockAdminToken":
        return HttpResponse.json(ADMIN);
      default:
        return HttpResponse.json(USER);
    }
  }),
  http.get(BASE_URL.API + "api/user", () => HttpResponse.json(USERS)),
  http.patch(BASE_URL.API + "api/user/:id", async ({ params, request }) => {
    const body = (await request.json()) as User;
    const user = USERS.find(({ id }) => id === Number(params.id));
    if (user) user.accountBalance = body.accountBalance;
    return HttpResponse.json("充值成功");
  }),
  http.delete(BASE_URL.API + "api/user/:id", async ({ params }) => {
    const index = USERS.findIndex(({ id }) => id === Number(params.id));
    if (index !== -1) USERS.splice(index, 1);
    return HttpResponse.json("删除成功");
  }),
];
