import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../views/SearchPage.vue";
import DetailPage from "../views/DetailPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import SignupPage from "../views/SignupPage.vue";

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
  {
    path: "/signup",
    name: "signup",
    component: SignupPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
