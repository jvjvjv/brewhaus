<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonImg } from "@ionic/vue";
</script>

<template>
  <ion-img
    src="/assets/home.jpg"
    alt="Beer Mug"
  />
  <ion-grid>
    <ion-row>
      <ion-col class="content">
        <h1>Welcome to Brewhaus!</h1>
        <p>
          Explore the world of beers and breweries. Find your favorite brews and
          share with friends! Discover new flavors and styles. Join the
          community of beer lovers! Cheers! Explore the world of beers and
          breweries. Find your favorite brews and share with friends!
        </p>
        <p>Discover new flavors and styles.</p>
        <p>Join the community of beer lovers!</p>
        <p>Cheers!</p>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
.ion-page {
  --ion-grid-padding: 0;
}

@media (min-width: 992px) {
  .ion-page .content {
    width: 680px;
  }
}
</style>
