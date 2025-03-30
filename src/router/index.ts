import { createRouter, createWebHistory } from "@ionic/vue-router";
import type { RouteRecordRaw } from "vue-router";

import TabsLayout from "@/layouts/TabsLayout.vue";
import HomePage from "@/pages/home/HomePage.vue";
import SearchPage from "@/pages/search/SearchPage.vue";
import FriendsPage from "@/pages/friends/FriendsPage.vue";

const homeRoute: RouteRecordRaw = {
  name: "home",
  path: "home",
  component: HomePage,
  meta: {
    title: "Home",
    tagline: "Find local breweries and see what's on tap!",
  },
};

const searchRoute: RouteRecordRaw = {
  name: "search",
  path: "search",
  component: SearchPage,
  meta: {
    title: "Search",
    tagline: "Search for a Brewery Near You!",
  },
};

const friendsRoute: RouteRecordRaw = {
  name: "friends",
  path: "friends",
  component: FriendsPage,
  meta: {
    title: "Friends",
    tagline: "See what your friends are drinking!",
  },
};

const tabRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    path: "/tabs/",
    component: TabsLayout,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      homeRoute,
      searchRoute,
      friendsRoute,
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
