import { immer } from "zustand/middleware/immer";
import { Action, Countries, Country, State } from "./types";
import { create } from "zustand";
import { initialState } from "./initialeState";

export const useStore = create<State & Action>()(
  immer((set) => ({
    ...initialState,
    setCountries: (data: Countries) =>
      set((state) => {
        state.countries = data;
      }),
    setSearchedCountry: (data: Countries) =>
      set((state) => {
        state.searchedCountry = data;
      }),
    setSelectedCountry: (data: Country) =>
      set((state) => {
        state.selectedCountry = data;
      }),
  }))
);
