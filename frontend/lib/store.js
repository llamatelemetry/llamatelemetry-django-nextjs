"use client";

import { create } from "zustand";

export const useDocUIStore = create((set) => ({
  // Global UI
  searchOpen: false,
  searchQuery: "",
  searchScope: "all",
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false, searchQuery: "" }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSearchScope: (searchScope) => set({ searchScope }),

  // Recipes
  recipeQuery: "",
  recipeTags: [],
  setRecipeQuery: (recipeQuery) => set({ recipeQuery }),
  toggleRecipeTag: (tag) =>
    set((state) => {
      const hasTag = state.recipeTags.includes(tag);
      return { recipeTags: hasTag ? state.recipeTags.filter((t) => t !== tag) : [...state.recipeTags, tag] };
    }),
  clearRecipeTags: () => set({ recipeTags: [] }),

  // Telemetry demo
  telemetryFilters: { service: "all", status: "all", search: "" },
  selectedSpanId: null,
  setTelemetryFilter: (key, value) =>
    set((state) => ({ telemetryFilters: { ...state.telemetryFilters, [key]: value } })),
  selectSpan: (selectedSpanId) => set({ selectedSpanId }),

  // Graph demo
  graphFilters: { type: "all", search: "" },
  selectedNodeId: null,
  setGraphFilter: (key, value) =>
    set((state) => ({ graphFilters: { ...state.graphFilters, [key]: value } })),
  selectNode: (selectedNodeId) => set({ selectedNodeId }),
}));
