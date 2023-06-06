import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../views/SearchPage.vue";
import DetailPage from "../views/DetailPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: SearchPage,
  },
  {
    path: "/card/:id",
    name: "cardDetail",
    component: DetailPage,
  },
  {
    path: "/profile",
    name: "profilePage",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
