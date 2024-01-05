import axios from "axios";
import { ElNotification } from "element-plus";
import router from "../router";
import BASE_URL from "../constants/baseURL";

const instance = axios.create({ baseURL: BASE_URL.API });

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response?.status >= 400 && error.response?.status < 500;

  if (!expectedError) console.error(error);

  if (error.response?.status === 401 && window.location.hash !== "#/login") {
    ElNotification({
      title: error?.response?.data?.message,
      type: "warning",
      position: "top-left",
    });
    router.push("/");
  }

  return Promise.reject(error);
});

const setJwt = (jwt: string) => {
  instance.defaults.headers.common["Authorization"] = jwt;
};

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  setJwt,
};
