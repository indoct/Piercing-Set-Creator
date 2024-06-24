import { configureStore } from "@reduxjs/toolkit";
import piercingsReducer from "../features/piercings/piercingsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import sessionReducer from "../features/session/sessionSlice";

export const store = configureStore({
  reducer: {
    piercings: piercingsReducer,
    filters: filtersReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
