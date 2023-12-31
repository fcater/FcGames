import { HttpResponse, http } from "msw";
import BASE_URL from "../../constants/baseURL";
import { User } from "../../types/User";

const USERS = [
  {
    id: 0,
    username: "admin",
    accountBalance: 0,
    isAdmin: true,
    token: "mockToken",
  },
  {
    id: 1,
    username: "fcater",
    accountBalance: 0,
    isAdmin: false,
    token: "mockToken",
  },
  {
    id: 2,
    username: "frank",
    accountBalance: 1200,
    isAdmin: false,
    token: "mockToken",
  },
];

export const userHandlers = [
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
