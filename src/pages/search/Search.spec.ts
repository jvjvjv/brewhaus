import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Search from "./Search.vue";


describe("Search.vue - searchQuery computed property", () => {
  it("should return query with by_name when searchBy is name", async () => {
    const wrapper = shallowMount(Search);

    // Get the underlying Vue instance
    const vm = wrapper.vm as any;

    // Directly modify the reactive variables that drive the computed property
    vm.searchBy = "name";
    vm.searchTerm = "Quinta";
    vm.searchPage = 1;

    // Check computed property
    expect(vm.searchQuery).toEqual({
      page: 1,
      by_name: "Quinta",
    });
  });

  it("should return query with by_city when searchBy is location and input does not match a ZIP Code pattern", async () => {
    const wrapper = shallowMount(Search);

    const vm = wrapper.vm as any;
    vm.searchBy = "location";
    vm.searchTerm = "New York";
    vm.searchPage = 1;

    expect(vm.searchQuery).toEqual({
      page: 1,
      by_city: "New York",
    });

    vm.searchTerm = "104";

    expect(vm.searchQuery).toEqual({
      page: 1,
      by_city: "104",
    });
  });

  it("should return query with postal when searchBy is location and input contains a ZIP Code pattern", async () => {
    const wrapper = shallowMount(Search);

    const vm = wrapper.vm as any;
    vm.searchBy = "location";
    vm.searchTerm = "90212";
    vm.searchPage = 1;

    expect(vm.searchQuery).toEqual({
      page: 1,
      by_postal: "90212",
    });
  });
});