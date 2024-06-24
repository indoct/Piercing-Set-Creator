import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ModList } from "../../types";

interface FiltersState {
  typeFilter: string | null;
  locaFilter: string | null;
  modFilters: string[];
}

const initialFiltersState: FiltersState = {
  typeFilter: null,
  locaFilter: null,
  modFilters: ModList,
};

const filtersSlice = createSlice({
  name: "filter",
  initialState: initialFiltersState,
  reducers: {
    setType: (state, action: PayloadAction<string | null>) => {
      state.typeFilter = action.payload;
    },
    setLocation: (state, action: PayloadAction<string | null>) => {
      state.locaFilter = action.payload;
    },
    setMods: (state, action: PayloadAction<string[]>) => {
      state.modFilters = action.payload;
    },
    toggleMod: (state, action: PayloadAction<string>) => {
      const mod = action.payload;
      state.modFilters = state.modFilters.includes(mod) ? state.modFilters.filter((m) => m !== mod) : [...state.modFilters, mod];
    },
  },
});

export const { setType, setLocation, setMods, toggleMod } = filtersSlice.actions;

export default filtersSlice.reducer;
