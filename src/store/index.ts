import { createStore } from "vuex";

// Small app, global store
export default createStore({
  state: {
    screenSize: "xs",
    lastSearchTerm: null,
    lastSearchType: null,
    lastSearchResults: [],
    lastSearchPage: 1,
  },
  mutations: {
    SET_SCREEN_SIZE(state, size) {
      state.screenSize = size;
    },
    SET_SEARCH(state, { type, term, results, page }) {
      state.lastSearchType = type;
      state.lastSearchTerm = term;
      state.lastSearchResults = results;
      state.lastSearchPage = page;
    },
  },
  actions: {
    setScreenSizeByWidth({ dispatch }, width) {
      let size = "xs";
      if (width >= 540) size = "sm";
      if (width >= 720) size = "md";
      if (width >= 960) size = "lg";
      if (width >= 1140) size = "xl";
      dispatch("setScreenSize", size);
    },
    setScreenSize({ commit }, size) {
      commit("SET_SCREEN_SIZE", size);
    },
    setLatestSearch({ commit }, { type, term, results, page }) {
      commit("SET_SEARCH", { type, term, results, page });
    },
  },
  getters: {
    screenSize: (state) => state.screenSize,
    lastSearch: (state) => ({
      type: state.lastSearchType,
      term: state.lastSearchTerm,
      results: state.lastSearchResults,
      page: state.lastSearchPage,
    }),
    isMobile: (state) => ["xs,sm"].includes(state.screenSize),
  },
});
