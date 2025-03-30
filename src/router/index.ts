import { createRouter, createWebHistory } from "@ionic/vue-router";
import type { RouteRecordRaw } from "vue-router";

import TabsLayout from "@/layouts/TabsLayout.vue";
import HomeTab from "@/pages/home/HomeTab.vue";
import SearchTab from "@/pages/search/SearchTab.vue";
import FriendsTab from "@/pages/friends/FriendsTab.vue";

const homeRouteTab: RouteRecordRaw = {
  name: "home",
  path: "home",
  component: HomeTab,
  meta: {
    title: "Home",
    tagline: "Find local breweries and see what's on tap!",
  },
};

const searchRouteTab: RouteRecordRaw = {
  name: "search",
  path: "search",
  component: SearchTab,
  meta: {
    title: "Search",
    tagline: "Search for a Brewery Near You!",
  },
};

const friendsRouteTab: RouteRecordRaw = {
  name: "friends",
  path: "friends",
  component: FriendsTab,
  meta: {
    title: "Friends",
    tagline: "See what your friends are drinking!",
  },
};

const tabRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: TabsLayout,
    children: [
      {
        path: "",
        redirect: "/home",
      },
      homeRouteTab,
      searchRouteTab,
      friendsRouteTab,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...tabRoutes],
});

export default router;

declare module "vue-router" {
  interface RouteMeta {
    title: string;
    tagline?: string;
  }
}
