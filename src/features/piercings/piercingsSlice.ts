import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Piercing } from "../../types";
import data from "../../data";

interface PiercingsState {
  data: Piercing[];
  selectedIds: Record<string, boolean>;
  disabledBones: Record<string, boolean>;
}

const initialPiercingsState: PiercingsState = {
  data: data,
  selectedIds: {},
  disabledBones: {},
};

const piercingsSlice = createSlice({
  name: "piercings",
  initialState: initialPiercingsState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<string>) => {
      const selectedNodeId = action.payload;
      const selectedPiercing = state.data.find(
        (p) => p.nodeid === selectedNodeId
      );

      if (!selectedPiercing) return;

      const selectedBone = selectedPiercing.bone;

      if (state.selectedIds[selectedNodeId]) {
        delete state.selectedIds[selectedNodeId];

        const isBoneStillSelected = Object.keys(state.selectedIds).some(
          (nodeId) =>
            state.data.find((p) => p.nodeid === nodeId)?.bone === selectedBone
        );

        if (!isBoneStillSelected) {
          delete state.disabledBones[selectedBone];
        }
      } else {
        state.selectedIds[selectedNodeId] = true;
        state.disabledBones[selectedBone] = true;
      }
    },
    resetPiercings: (state) => {
      state.selectedIds = {};
      state.disabledBones = {};
    },
  },
});

export const { toggleSelected, resetPiercings } = piercingsSlice.actions;

export default piercingsSlice.reducer;
