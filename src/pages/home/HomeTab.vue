<script setup lang="ts">
import { useRoute } from "vue-router";

import { useRouteMeta } from "@/utils/useRouteMeta";
import TabbedPage from "@/components/TabbedPage.vue";
import Home from "./Home.vue";

const { pageTitle } = useRouteMeta(useRoute());
</script>

<template>
  <tabbed-page
    :page-title="pageTitle"
    fullscreen
  >
    <home />
  </tabbed-page>
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
