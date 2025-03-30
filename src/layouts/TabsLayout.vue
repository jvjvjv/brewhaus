<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  beer,
  beerOutline,
  search,
  searchOutline,
  peopleCircle,
  peopleCircleOutline,
} from "ionicons/icons";

import type { INavigationTab } from "@/types";

const route = useRoute();

const chooseIcon = (path: string, activeIcon: string, inactiveIcon: string) =>
  route.path == path ? activeIcon : inactiveIcon;

const tabs = computed(
  (): Array<INavigationTab> => [
    {
      name: "home",
      icon: chooseIcon("/tabs/home", beer, beerOutline),
      label: "Home",
    },
    {
      name: "search",
      icon: chooseIcon("/tabs/search", search, searchOutline),
      label: "Search",
    },
    {
      name: "friends",
      icon: chooseIcon("/tabs/friends", peopleCircle, peopleCircleOutline),
      label: "Friends",
    },
  ]
);
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          v-for="tab in tabs"
          :key="tab.name"
          :tab="tab.name"
          :href="`/tabs/${tab.name}`"
        >
          <ion-icon
            aria-hidden="true"
            :icon="tab.icon"
          />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
