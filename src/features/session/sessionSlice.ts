import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setSessionOver: (state, action: PayloadAction<boolean>) => {
      state.sessionOver = action.payload;
    },
  },
});

export const { setSessionOver } = sessionSlice.actions;
export default sessionSlice.reducer;
