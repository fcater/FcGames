import { createRouter, createWebHashHistory } from "vue-router";

import auth from "../services/authService";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import ManageUsers from "../views/ManageUsers.vue";

const routes = [
  { path: "/", redirect: "home" },
  { path: "/home", component: Home },
  { path: "/users", component: ManageUsers },
  { path: "/login", component: Login },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({ routes, history: createWebHashHistory() });

router.beforeEach((to, _, next) => {
  if (!auth.getJwt() && to.path !== "/login") next({ path: "/login" });
  else if (auth.getJwt() && to.path === "/login") next({ path: "/" });
  else next();
});

export default router;
