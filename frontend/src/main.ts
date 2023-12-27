import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./mock";
import App from "./App.vue";
import router from "./router";

import "element-plus/dist/index.css";
import "./style.css";

const app = createApp(App);

console.log(Object.entries(ElementPlusIconsVue));

for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}

app.use(router).use(ElementPlus).mount("#app");
