import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:8080/" });

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response?.status >= 400 && error.response?.status < 500;

  if (!expectedError) console.log(error);

  return Promise.reject(error);
});

const setJwt = (jwt: string) => {
  instance.defaults.headers.common["Authorization"] = jwt;
};

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  setJwt,
};
