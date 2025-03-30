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

const formatPhone = (phone: string) =>
  phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
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
      <template v-if="brewery.phone">
        <h2><strong>Phone</strong></h2>
        <p @click="(e) => e.stopPropagation()">
          <a :href="`tel:${brewery.phone}`">{{ formatPhone(brewery.phone) }}</a>
        </p>
      </template>
      <template v-if="brewery.website_url">
        <h2><strong>Website</strong></h2>
        <p @click="(e) => e.stopPropagation()">
          <a
            :href="brewery.website_url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ brewery.website_url }}
          </a>
        </p>
      </template>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
.strike {
  text-decoration: line-through;
}
</style>
