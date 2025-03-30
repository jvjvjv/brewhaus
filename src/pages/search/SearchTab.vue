<script setup lang="ts">
import { useRoute } from "vue-router";

import { useRouteMeta } from "@/utils/useRouteMeta";

import TabbedPage from "@/components/TabbedPage.vue";
import Search from "./Search.vue";

const route = useRoute();
const { pageTitle } = useRouteMeta(route);
</script>

<template>
  <tabbed-page :page-title="pageTitle">
    <search />
  </tabbed-page>
</template>
