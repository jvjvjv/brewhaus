<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/vue";
import { useRoute } from "vue-router";

import useRouteMeta from "@/utils/useRouteMeta";
import TabWrapper from "@/components/TabWrapper.vue";

const { pageTitle } = useRouteMeta(useRoute());
</script>

<template>
  <tab-wrapper
    :page-title="pageTitle"
    fullscreen
  >
    <ion-img src="/assets/friends.jpg" />
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
  </tab-wrapper>
</template>
