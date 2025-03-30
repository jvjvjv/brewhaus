<script setup lang="ts">
import { IonImg } from "@ionic/vue";
import store from "@/store";
</script>

<template>
  <div :class="{ desktop: !['xs', 'sm'].includes(store.getters.screenSize) }">
    <ion-img
      src="/assets/friends.jpg"
      v-if="['xs', 'sm'].includes(store.getters.screenSize)"
    />
    <div class="ion-padding">
      <h1>Coming soon!</h1>
      <p>
        Find and connect with your friends! Share your favorite breweries and
        beers.
      </p>
      <p>Join the community of beer lovers!</p>
    </div>
  </div>
</template>

<style scoped>
.desktop {
  background: url("/assets/friends.jpg") no-repeat center;
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
