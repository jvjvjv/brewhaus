<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

import store from "@/store";
import { ref, watch } from "vue";

const showHeader = ref(false);
watch(
  () => store.getters.isMobile,
  () => {
    showHeader.value = store.getters.isMobile;
  }
);

withDefaults(defineProps<{ pageTitle: string; fullscreen?: boolean }>(), {
  fullscreen: false,
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="fullscreen">
      <slot />
    </ion-content>
  </ion-page>
</template>
