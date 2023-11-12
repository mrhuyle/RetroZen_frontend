import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router, axios);

app.mount("#app");
