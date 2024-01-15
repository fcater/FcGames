import { HttpResponse, http } from "msw";
import { User } from "../../types";
import BASE_URL from "../../constants/baseURL";
import authService from "../../services/authService";

export const ADMIN = {
  id: 0,
  username: "admin",
  accountBalance: 0,
  isAdmin: true,
  token: "mockToken",
};

export const USER = {
  id: 1,
  username: "fcater",
  accountBalance: 0,
  isAdmin: false,
  token: "mockToken",
};

export const authHandlers = [
  http.get(BASE_URL.API + "api/parseToken", () => {
    switch (authService.getJwt()) {
      case "mockAdminToken":
        return HttpResponse.json(ADMIN);
      default:
        return HttpResponse.json(USER);
    }
  }),
  http.post(BASE_URL.API + "login", async ({ request }) => {
    const body = (await request.json()) as User;
    switch (body.password) {
      case "admin":
        return HttpResponse.json("mockAdminToken");
      case "wrong":
        return new HttpResponse("用户名或密码错误", { status: 401 });
      default:
        return HttpResponse.json("mockUserToken");
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
