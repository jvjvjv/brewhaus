<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Brewhaus!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Brewhaus!</ion-title>
        </ion-toolbar>
      </ion-header>
      <h1>Welcome to Brewhaus!</h1>
      <p>Explore the world of beers and breweries.</p>
      <p>Find your favorite brews and share with friends!</p>
      <p>Discover new flavors and styles.</p>
      <p>Join the community of beer lovers!</p>
      <p>Cheers!</p>
      <p>Explore the world of beers and breweries.</p>
      <p>Find your favorite brews and share with friends!</p>
      <p>Discover new flavors and styles.</p>
      <p>Join the community of beer lovers!</p>
      <p>Cheers!</p>
    </ion-content>
  </ion-page>
</template>
