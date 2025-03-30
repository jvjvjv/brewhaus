<script setup lang="ts">
import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";

import { IBrewery } from "@/types";

defineProps<{
  brewery: IBrewery;
}>();

const microBreweryMap = new Map<string, string>([
  ["micro", "Micro Brewery"],
  ["nano", "Nanobrewery"],
  ["regional", "Regional Brewery"],
  ["brewpub", "Brewpub"],
  ["large", "Large Brewery"],
  ["planning", "Planning Brewery"],
  ["bar", "Bar"],
  ["contract", "Contract Brewery"],
  ["proprietor", "Proprietor Brewery"],
  ["closed", "Closed Brewery"],
]);
</script>

<template>
  <ion-card>
    <ion-img
      v-if="brewery.image"
      :src="brewery.image"
      alt="Brewery Image"
    />
    <ion-card-header>
      <ion-card-title>{{ brewery.name }}</ion-card-title>
      <ion-card-subtitle color="tertiary">
        {{ microBreweryMap.get(brewery.brewery_type) }}
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <p
        v-for="(p, i) of brewery.description"
        :key="i"
      >
        {{ p }}
      </p>
      <hr />
      <h2><strong>Address</strong></h2>
      <p>
        {{ brewery.street }}<br />
        {{ brewery.city }}, {{ brewery.state }}
        {{ brewery.postal_code }}
      </p>
      <h2><strong>Phone</strong></h2>
      <p>
        <a :href="`tel:${brewery.phone}`">{{ brewery.phone }}</a>
      </p>
      <h2><strong>Website</strong></h2>
      <p>
        <a
          :href="brewery.website_url"
          target="_blank"
        >
          {{ brewery.website_url }}
        </a>
      </p>
    </ion-card-content>
  </ion-card>
</template>
