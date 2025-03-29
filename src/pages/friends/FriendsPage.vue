<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRoute } from "vue-router";

import useRouteMeta from "@/utils/useRouteMeta";

const { pageTitle } = useRouteMeta(useRoute());
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col class="content">
            <h1>Coming soon!</h1>
            <p>
              Find and connect with your friends! Share your favorite breweries
              and beers.
            </p>
            <p>Join the community of beer lovers!</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
