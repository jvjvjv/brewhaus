<script setup lang="ts">
import { useRoute } from "vue-router";

import { useRouteMeta } from "@/utils/useRouteMeta";
import TabbedPage from "@/components/TabbedPage.vue";
import Friends from "./Friends.vue";

const { pageTitle } = useRouteMeta(useRoute());
</script>

<template>
  <tabbed-page
    :page-title="pageTitle"
    fullscreen
  >
    <friends />
  </tabbed-page>
</template>
