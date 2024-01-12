import { HttpResponse, http } from "msw";
import { User } from "../../types";
import BASE_URL from "../../constants/baseURL";

const ADMIN = {
  id: 0,
  username: "admin",
  accountBalance: 0,
  isAdmin: true,
  token: "mockToken",
};

const USER = {
  id: 1,
  username: "fcater",
  accountBalance: 0,
  isAdmin: false,
  token: "mockToken",
};

export const authHandlers = [
  http.post(BASE_URL.API + "login", async ({ request }) => {
    const body = (await request.json()) as User;
    switch (body.password) {
      case "admin":
        return HttpResponse.json(ADMIN);
      case "wrong":
        return new HttpResponse("用户名或密码错误", { status: 401 });
      default:
        return HttpResponse.json(USER);
    }
  }),
  http.post(BASE_URL.API + "register", async ({ request }) => {
    const body = (await request.json()) as User;
    switch (body.username) {
      case "admin":
        return new HttpResponse("用户名已存在", { status: 409 });
      default:
        return HttpResponse.json(USER);
    }
  }),
];
