<script setup lang="ts">
import { IonImg } from "@ionic/vue";
import store from "@/store";
</script>

<template>
  <div :class="{ desktop: !['xs', 'sm'].includes(store.getters.screenSize) }">
    <ion-img
      src="/assets/home.jpg"
      alt="Beer Mug"
      v-if="['xs', 'sm'].includes(store.getters.screenSize)"
    />
    <div class="ion-padding">
      <h1>Welcome to Brewhaus!</h1>
      <p>
        Explore the world of beers and breweries. Find your favorite brews and
        share with friends! Discover new flavors and styles. Join the community
        of beer lovers! Cheers! Explore the world of beers and breweries. Find
        your favorite brews and share with friends!
      </p>
      <p>Discover new flavors and styles.</p>
      <p>Join the community of beer lovers!</p>
      <p>Cheers!</p>
    </div>
  </div>
</template>

<style scoped>
.desktop {
  background: url("/assets/home.jpg") no-repeat bottom center;
  background-size: cover;
  height: 100%;

  .ion-padding {
    position: absolute;
    top: 8rem;
    left: 4rem;
    border-radius: 1rem;
    width: 24rem;
    background-color: var(--ion-color-light);
    color: var(--ion-color-dark);
    padding: 2rem;
  }
}
</style>
