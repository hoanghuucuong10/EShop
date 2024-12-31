import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import ConfirmModal from "./components/ConfirmModal.vue";

const app = createApp(App);
app.use(createPinia());

app.component('ConfirmModal', ConfirmModal);

app.use(router);
app.mount("#app");
