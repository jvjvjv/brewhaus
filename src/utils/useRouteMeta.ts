import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

// const route = useRoute();

export default function useRouteMeta(currentRoute: RouteLocationNormalized) {
  const routeMeta = currentRoute.meta;
  const pageTitle = ref(routeMeta.title || "Your gateway to a great night!");

  const setTitle = (newTitle: string) => {
    pageTitle.value = newTitle;
    window.document.title = `${pageTitle.value} | Brewhaus`;
  };

  return { setTitle, pageTitle };
}
