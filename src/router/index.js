import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import IndexView from "../views/IndexView.vue";
import UserAlyViewVue from "@/views/UserAlyView.vue";
import EmoAnalysisView from "../views/EmoAlysView.vue";
// import Piechart from "@/components/Piechart.vue";
// import Linechart from "@/components/Linechart.vue";
import PieLinechart from "@/components/PieLinechart.vue";
import Barchart from "@/components/Barchart.vue";
import Hopperchart from "@/components/Hopperchart.vue";
import Leidachart from "@/components/Leidachart.vue";
import HotSearch from "@/views/HotSearch.vue";
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
        {
          path: "/pielinechart",
          name: "pielinechart",
          component: PieLinechart,
        },
      
        {
          path: "/barchart",
          name: "barchart",
          component: Barchart,
        },
        {
          path: "/hopperchart",
          name: "hopperchart",
          component: Hopperchart,
        },
        {
          path: "/leidachart",
          name: "leidachart",
          component: Leidachart,
        },
        {
          path: "/hotsearch",
          name: "hotsearch",
          component: HotSearch,
        }
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("token") && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});
export default router;
