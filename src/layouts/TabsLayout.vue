<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import store from "@/store";

import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonButton,
} from "@ionic/vue";
import {
  home,
  homeOutline,
  search,
  searchOutline,
  peopleCircle,
  peopleCircleOutline,
} from "ionicons/icons";

import type { INavigationTab } from "@/types";

const pageRef = ref<typeof IonPage | null>(null);
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    store.dispatch("setScreenSizeByWidth", entry.contentRect.width);
  }
});
onMounted(() => {
  if (pageRef.value) {
    ro.observe(pageRef.value.$el);
  }
});

onBeforeUnmount(() => {
  if (pageRef.value) {
    ro.unobserve(pageRef.value.$el);
  }
});

const navItems = computed(
  (): Array<INavigationTab> => [
    {
      name: "home",
      icon: chooseIcon("/home", home, homeOutline),
      label: "Home",
    },
    {
      name: "search",
      icon: chooseIcon("/search", search, searchOutline),
      label: "Search",
    },
    {
      name: "friends",
      icon: chooseIcon("/friends", peopleCircle, peopleCircleOutline),
      label: "Friends",
    },
  ]
);

const route = useRoute();
const chooseIcon = (path: string, activeIcon: string, inactiveIcon: string) =>
  route.path == path ? activeIcon : inactiveIcon;
</script>

<template>
  <ion-page ref="pageRef">
    <ion-tabs v-if="['xs', 'sm'].includes(store.getters.screenSize)">
      <ion-router-outlet />
      <ion-tab-bar
        slot="bottom"
        class="ion-hide-md-up"
      >
        <ion-tab-button
          v-for="tab in navItems"
          :key="tab.name"
          @click="$router.push(`/${tab.name}`)"
        >
          <ion-icon
            aria-hidden="true"
            :icon="tab.icon"
          />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <template v-else>
      <ion-header>
        <ion-toolbar>
          <ion-title>Brewhaus!</ion-title>
          <ion-buttons slot="end">
            <ion-button
              v-for="button in navItems"
              :key="button.name"
              @click="$router.push(`/${button.name}`)"
              aria-label="Navigate to {{ button.label }}"
            >
              <ion-icon
                :icon="button.icon"
                aria-hidden="true"
              />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding">
        <ion-router-outlet />
      </div>
    </template>
  </ion-page>
</template>
