import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Home from "@/views/index.vue";
import About from "@/views/About.vue";

import LoginPage from "@/views/admin/Login.vue";
import AdminDashboard from "@/views/admin/index.vue";
import ProductsManage from "@/views/admin/products/products.vue";
import FormProduct from "@/views/admin/products/formProduct.vue";
import ProductDetails from "@/views/admin/products/productDetails.vue";
import Cart from "@/views/Cart.vue";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    name: "Login"
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "about", name: "About", component: About },
      { path: "cart", name: "Cart", component: Cart },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "AdminDashboard", component: AdminDashboard },
      {
        path: "products",
        children:[
          { 
            path: "list", 
            name: "ProductManage", 
            component: ProductsManage ,
            children: [{
              path: ':id',
              name: 'ProductDetails',
              component: ProductDetails,
              props: true,
            },
          ],},
          { path: "create", name: "CreateProduct", component: FormProduct },
          { path: "update/:id", name: "UpdateProduct", component: FormProduct }
        ]
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
