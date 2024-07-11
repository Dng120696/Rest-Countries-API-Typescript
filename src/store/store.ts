import { immer } from "zustand/middleware/immer";
import { Action, Countries, State } from "./types";
import { create } from "zustand";
import { initialState } from "./initialeState";

export const useStore = create<State & Action>()(
  immer((set) => ({
    ...initialState,
    setCountries: (data: Countries) =>
      set((state) => {
        state.countries = data;
      }),
    searchCountry: (data: Countries) =>
      set((state) => {
        state.searchedCountry = data;
      }),
  }))
);
