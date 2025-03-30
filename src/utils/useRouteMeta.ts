import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

// const route = useRoute();

export function useRouteMeta(currentRoute: RouteLocationNormalized) {
  const pageTitle = ref();
  const pageTagline = ref();
  const setTitle = (newTitle: string, newTagline?: string) => {
    pageTitle.value = newTitle ?? "";
    pageTagline.value = newTagline || "";
    let title = "";
    if (pageTitle.value) title = `${pageTitle.value}`;
    if (pageTagline.value) title = `${title} - ${pageTagline.value}`;
    title += " | Brewhaus";

    window.document.title = title;
  };
  const routeMeta = currentRoute.meta;
  setTitle(routeMeta?.title || "", routeMeta?.tagline || "");

  return { setTitle, pageTitle, pageTagline };
}
