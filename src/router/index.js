import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem("currentUser");
      if (!user || (user !== "b" && user !== "m")) {
        next("/login");
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
