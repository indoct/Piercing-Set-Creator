import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Piercing } from "../../types";
import data from "../../data";

interface PiercingsState {
  data: Piercing[];
  selectedIds: Record<string, boolean>;
}

const initialPiercingsState: PiercingsState = {
  data: data,
  selectedIds: {},
};

const piercingsSlice = createSlice({
  name: "piercings",
  initialState: initialPiercingsState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<string>) => {
      if (state.selectedIds[action.payload]) {
        delete state.selectedIds[action.payload];
      } else {
        state.selectedIds[action.payload] = true;
      }
    },
    resetPiercings: (state) => {
      state.data = data;
    },
  },
});

export const { toggleSelected, resetPiercings } = piercingsSlice.actions;

export default piercingsSlice.reducer;
