<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type {
  InfiniteScrollCustomEvent,
  SearchbarCustomEvent,
} from "@ionic/vue";

import {
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonAlert,
} from "@ionic/vue";

import { locateOutline } from "ionicons/icons";

import LazyList from "@/components/LazyList.vue";
import BreweryDetailCard from "@/components/BreweryDetailCard.vue";

import { search, locationOutline } from "ionicons/icons";

import type { IBrewery } from "@/types";

import { getBreweries, getIpsum } from "@/api";
import { useLocation } from "@/utils/useLocation";
import { useWebsiteMetadata } from "@/utils/useWebsiteMetadata";

const gps = useLocation();

const disableInfiniteScroll = ref(false);
const searchBy = ref<"name" | "location">("name");
const searchTerm = ref("");
watch(searchBy, () => {
  searchTerm.value = "";
});
const searchPage = ref(1);
const searchIcon = computed(() =>
  searchBy.value === "name" ? search : locationOutline
);
const searchQuery = computed(() => ({
  page: searchPage.value,
  [searchBy.value == "name"
    ? "by_name"
    : /^[A-Za-z0-9\- ]{2,10}$/.test(searchTerm.value)
    ? "by_postal"
    : "by_city"]: searchTerm.value,
}));
const breweries = ref<IBrewery[]>([]);
const selectedBrewery = ref<IBrewery | null>(null);
const selectedBreweryFailedToFetch = ref(false);
const pageError = ref<string | null>(null);

const doToggleSearchBy = (e: CustomEvent) => {
  searchBy.value = e.detail.value;
  searchPage.value = 1;
  breweries.value = [];
};

const doSearchBy = async (e: SearchbarCustomEvent) => {
  searchTerm.value = (e.target as HTMLIonSearchbarElement).value || "";
  if (searchTerm.value.length > 2) {
    try {
      const results = await getBreweries(searchQuery.value);
      breweries.value = results;
    } catch (e) {
      pageError.value =
        "Error getting current location:" + (e as Error).message;
    }
  } else {
    breweries.value = [];
  }
};

const doSearchByLocation = async () => {
  try {
    const pos = await gps?.getCurrentPosition();
    console.log(pos);
    const results = await getBreweries({
      page: searchPage.value,
      by_dist: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      },
    });
    breweries.value = results;
  } catch (e) {
    pageError.value = "Error fetching breweries:" + (e as Error).message;
  }
};

const doInfinite = async (e: InfiniteScrollCustomEvent) => {
  searchPage.value += 1;
  const results = await getBreweries(searchQuery.value);
  if (results.length === 0) {
    e.target.complete();
    disableInfiniteScroll.value = true;
    return;
  }
  breweries.value.push(...results);
  e.target.complete();
};

const doSelect = async (brewery: IBrewery) => {
  if (brewery.id == selectedBrewery.value?.id) {
    selectedBrewery.value = null;
    return;
  }
  selectedBrewery.value = brewery;
  if (selectedBrewery.value.description) return;
  if (brewery.website_url) {
    try {
      const { status, description, image } = await useWebsiteMetadata(
        brewery.website_url
      );
      selectedBreweryFailedToFetch.value = status == "error";
      if (description) selectedBrewery.value.description = [description];
      if (image) selectedBrewery.value.image = image;
      return;
    } catch (e) {
      console.error("Error fetching website metadata:", e);
    }
  }
  selectedBrewery.value.description = await getIpsum();
};
</script>

<template>
  <div>
    <ion-segment
      :value="searchBy"
      @ionChange="doToggleSearchBy"
    >
      <ion-segment-button value="name">
        <ion-label>by Name</ion-label>
      </ion-segment-button>
      <ion-segment-button value="location">
        <ion-label>by Location</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-searchbar
      :debounce="500"
      :search-icon="searchIcon"
      :enterkeyhint="'search'"
      :autocomplete="searchBy == 'name' ? 'off' : 'address-level2'"
      :placeholder="`Search by ${
        searchBy == 'name' ? 'name' : 'city or ZIP code'
      }...`"
      :value="searchTerm"
      @ionInput="($event) => doSearchBy($event)"
    />
    <ion-button
      v-if="searchBy == 'location' && gps.isGeolocationAvailable"
      expand="full"
      size="small"
      @click="doSearchByLocation"
    >
      <ion-icon
        slot="start"
        :icon="locateOutline"
      />
      Search near you
    </ion-button>

    <lazy-List
      v-if="breweries.length"
      :items="breweries"
      :disable-infinite-scroll="disableInfiniteScroll"
      :on-load-data="doInfinite"
      class="search-results"
      @item-click="doSelect"
    >
      <template v-slot="{ item: brewery }">
        <brewery-detail-card
          v-if="selectedBrewery?.id == brewery.id"
          :brewery="brewery"
          :invalid-url="selectedBreweryFailedToFetch"
        />
        <template v-else>
          <h2>{{ brewery.name }}</h2>
          <p>{{ brewery.city }}, {{ brewery.state }}</p>
        </template>
      </template>
    </lazy-List>
    <div v-else>
      <ion-card v-if="searchBy == 'name'">
        <ion-card-header>
          <ion-card-title>Search for breweries</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Enter a name or city to search for breweries. Click on a brewery to
            see more details.
          </p>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="searchBy == 'location'">
        <ion-card-header>
          <ion-card-title>Search by location</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Click the button to search for breweries near your location, or
            enter your city. Click on a brewery to see more details.
          </p>
        </ion-card-content>
      </ion-card>
    </div>
    <ion-alert
      :is-open="pageError"
      :message="pageError"
      :buttons="['OK']"
      header="Something bad happened"
      @didDismiss="pageError = null"
    />
  </div>
</template>
