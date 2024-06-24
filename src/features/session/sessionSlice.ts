import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionOver: boolean;
}

const initialState: SessionState = {
  sessionOver: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    toggleSession: (state) => {
      state.sessionOver = !state.sessionOver;
    },
    setSessionOver: (state, action: PayloadAction<boolean>) => {
      state.sessionOver = action.payload;
    },
  },
});

export const { toggleSession, setSessionOver } = sessionSlice.actions;
export default sessionSlice.reducer;
