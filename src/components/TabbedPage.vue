<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

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
