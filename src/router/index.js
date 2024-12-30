import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Home from "@/views/index.vue";
import About from "@/views/About.vue";
import AdminDashboard from "@/views/admin/index.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "about", name: "About", component: About },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [{ path: "", name: "AdminDashboard", component: AdminDashboard }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
