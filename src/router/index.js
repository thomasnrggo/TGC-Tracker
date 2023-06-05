import { createRouter, createWebHashHistory } from "vue-router";
import SearchPage from "../views/SearchPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
