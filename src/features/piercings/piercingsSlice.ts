import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Piercing } from "../../types";
import data from "../../data";

interface PiercingsState {
  data: Piercing[];
}

const initialPiercingsState: PiercingsState = {
  data: data,
};

const piercingsSlice = createSlice({
  name: "piercings",
  initialState: initialPiercingsState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<number>) => {
      state.data = state.data.map((piercing) => (piercing.index === action.payload ? { ...piercing, selected: !piercing.selected } : piercing));
    },
    resetPiercings: (state) => {
      state.data = data;
    },
  },
});

export const { toggleSelected, resetPiercings } = piercingsSlice.actions;

export default piercingsSlice.reducer;
