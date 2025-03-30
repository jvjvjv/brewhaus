<script setup lang="ts">
import type { InfiniteScrollCustomEvent } from "@ionic/vue";
import {
  IonList,
  IonLabel,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";

defineProps<{
  items: Array<any>;
  disableInfiniteScroll?: boolean;
  onLoadData: (event: InfiniteScrollCustomEvent) => void;
}>();
</script>
<template>
  <div>
    <ion-list>
      <ion-item
        v-for="item in items"
        :key="item.id"
        @click="$emit('item-click', item)"
      >
        <ion-label>
          <slot :item="item" />
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-infinite-scroll
      :disabled="disableInfiniteScroll"
      @ionInfinite="onLoadData"
    >
      <ion-infinite-scroll-content
        loadingSpinner="bubbles"
      ></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </div>
</template>
