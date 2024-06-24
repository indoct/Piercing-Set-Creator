import { configureStore } from "@reduxjs/toolkit";
import piercingsReducer from "../features/piercings/piercingsSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    piercings: piercingsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
