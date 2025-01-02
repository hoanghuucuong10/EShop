import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import ConfirmModal from "./components/ConfirmModal.vue";
import Spinner from "./components/Spinner.vue"

const app = createApp(App);
app.use(createPinia());

app.component('ConfirmModal', ConfirmModal);
app.component('Spinner', Spinner);

app.use(router);
app.mount("#app");
