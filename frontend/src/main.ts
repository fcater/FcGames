import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import App from "./App.vue";
import router from "./router";

import "element-plus/dist/index.css";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}

const enableMocking = async () => {
  if (process.env.NODE_ENV !== "development") return;
  const { worker } = await import("./mocks/browser");
  return worker.start();
};

enableMocking().then(() => {
  app.use(pinia).use(router).use(ElementPlus).mount("#app");
});
