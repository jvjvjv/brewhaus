<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import type { InfiniteScrollCustomEvent } from "@ionic/vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonAlert,
} from "@ionic/vue";
import { search, locateOutline, locationOutline } from "ionicons/icons";

import type { IBrewery } from "@/types";

import { getBreweries, getIpsum } from "@/api";
import useRouteMeta from "@/utils/useRouteMeta";
import useLocation from "@/utils/useLocation";

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

const gps = useLocation();
const route = useRoute();
const { pageTitle } = useRouteMeta(route);

const searchBy = ref<"name" | "location">("name");
const searchTerm = ref("");
const searchPage = ref(1);
const searchIcon = computed(() =>
  searchBy.value === "name" ? search : locationOutline
);

const searchQuery = computed(() => ({
  page: searchPage.value,
  [searchBy.value == "name" ? "by_name" : "by_city"]: searchTerm.value,
}));
const breweries = ref<IBrewery[]>([]);
const selectedBrewery = ref<IBrewery | null>(null);
const pageError = ref<string | null>(null);

const doToggleSearchBy = (e: CustomEvent) => {
  searchBy.value = e.detail.value;
  searchPage.value = 1;
  breweries.value = [];
};

const doSearchBy = async (e: InputEvent) => {
  searchTerm.value = (e.target as HTMLInputElement).value;
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
  selectedBrewery.value.description = await getIpsum();
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
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
        :placeholder="`Search by ${searchBy == 'name' ? 'name' : 'city'}...`"
        @ionInput="void doSearchBy"
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

      <div
        class="search-results"
        v-if="breweries.length"
      >
        <ion-list>
          <ion-item
            v-for="brewery in breweries"
            :key="brewery.id"
            @click="doSelect(brewery)"
          >
            <ion-label>
              <ion-card v-if="selectedBrewery?.id == brewery.id">
                <ion-card-header>
                  <ion-card-title>{{ selectedBrewery.name }}</ion-card-title>
                  <ion-card-subtitle>
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
              <template v-else>
                <h2>{{ brewery.name }}</h2>
                <p>{{ brewery.city }}, {{ brewery.state }}</p>
              </template>
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="doInfinite">
          <ion-infinite-scroll-content
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
      <div v-else>
        <ion-card v-if="searchBy == 'name'">
          <ion-card-header>
            <ion-card-title>Search for breweries</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              Enter a name or city to search for breweries. Click on a brewery
              to see more details.
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
    </ion-content>
  </ion-page>
</template>
