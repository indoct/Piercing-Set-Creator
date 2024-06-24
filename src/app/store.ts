import { configureStore } from "@reduxjs/toolkit";
import piercingsReducer from "../features/piercings/piercingsSlice";

export const store = configureStore({
  reducer: {
    piercings: piercingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
