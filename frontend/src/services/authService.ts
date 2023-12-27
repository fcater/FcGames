import { ElNotification } from "element-plus";
import { LoginForm } from "../types/LoginForm";
import http from "./httpService";
import router from "../router";
import multiavatar from "@multiavatar/multiavatar";

const userInfoKey = "userInfo";
const BASE_URL = "http://localhost:8080";
const LOGIN_URL = BASE_URL + "/login";
const REGISTER_URL = BASE_URL + "/register";

const login = async (form: LoginForm, url = LOGIN_URL, msg = "登陆成功！") => {
  try {
    const { data } = await http.post(url, form);
    http.setJwt(data.token);
    localStorage.setItem(userInfoKey, JSON.stringify(data));

    ElNotification({ title: msg, type: "success", position: "top-left" });
    router.push("/");
  } catch (error: any) {
    console.log(error?.response?.data);
    throw error?.response?.data;
  }
};

const register = async (form: LoginForm) =>
  login(form, REGISTER_URL, "注册成功");

const logout = () => {
  localStorage.removeItem(userInfoKey);
  ElNotification({ title: "已退出", type: "success", position: "top-left" });
  router.push("/login");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(userInfoKey) || "{}");
};

const getJwt = () => {
  return JSON.parse(localStorage.getItem(userInfoKey) || "{}")?.token;
};

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
