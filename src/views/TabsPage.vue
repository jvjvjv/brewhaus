<script setup lang="ts">
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

const tabs: Array<INavigationTab> = [
  {
    name: "tab1",
    icon: route.path == "/tabs/home" ? beer : beerOutline,
    label: "Home",
  },
  {
    name: "tab2",
    icon: route.path == "/tabs/search" ? search : searchOutline,
    label: "Search",
  },
  {
    name: "tab3",
    icon: route.path == "/tabs/friends" ? peopleCircle : peopleCircleOutline,
    label: "Friends",
  },
];

console.log(route);
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
