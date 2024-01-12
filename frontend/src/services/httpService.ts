import axios from "axios";

import router from "../router";
import toast from "../constants/toast";
import BASE_URL from "../constants/baseURL";
import localStorageKeys from "../constants/localStorageKeys";
import { AUTH_MESSAGE_TIME } from "../constants/delay";

const instance = axios.create({ baseURL: BASE_URL.API });

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response?.status >= 400 && error.response?.status < 500;

  if (!expectedError) console.error(error);

  if (error.response?.status === 401 && window.location.hash !== "#/login") {
    toast.warning(error?.response?.data?.message);
    router.push("/");
  }

  if (error.response?.status === 401 && window.location.hash === "#/home") {
    toast.warning(error?.response?.data?.message);
    localStorage.removeItem(localStorageKeys.USER);
    setTimeout(() => (location.href = "/"), AUTH_MESSAGE_TIME);
  }

  return Promise.reject(error);
});

const setJwt = (jwt: string) => {
  instance.defaults.headers.common["Authorization"] = jwt;
};

export default {
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  setJwt,
};
