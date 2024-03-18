import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import IndexView from "../views/IndexView.vue";
import UserAlyViewVue from "@/views/UserAlyView.vue";
import EmoAnalysisView from "../views/EmoAlysView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: IndexView,
        },
        {
          path: "/emo_analysis",
          name: "emo_analysis",
          component: EmoAnalysisView,
        },
        {
          path: "/user_analysis",
          name: "user_analysis",
          component: UserAlyViewVue,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
