import multiavatar from "@multiavatar/multiavatar";

import http from "./httpService";
import { LoginForm } from "../types/LoginForm";
import localStorageKeys from "../constants/localStorageKeys";

const BASE_URL = "http://localhost:8080";

const login = (form: LoginForm) => http.post(BASE_URL + "/login", form);

const register = (form: LoginForm) => http.post(BASE_URL + "/register", form);

const logout = () => localStorage.removeItem(localStorageKeys.USER);

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(localStorageKeys.USER) || "{}");
};

const getJwt = () => {
  return JSON.parse(localStorage.getItem(localStorageKeys.USER) || "{}")?.token;
};

http.setJwt(getJwt());

const avatars = [
  "Xbox",
  "Play Station",
  "Nintendo",
  "Steam",
  "Facebook",
  "Apple",
  "Lego",
].map((name) => multiavatar(name));

export default {
  avatars,
  login,
  logout,
  register,
  getCurrentUser,
  getJwt,
};
