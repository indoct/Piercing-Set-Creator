import { configureStore } from "@reduxjs/toolkit";
import piercingsReducer from "../features/piercings/piercingsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import sessionReducer from "../features/session/sessionSlice";
import paginateReducer from "../features/pagination/paginateSlice";

export const store = configureStore({
  reducer: {
    piercings: piercingsReducer,
    filters: filtersReducer,
    session: sessionReducer,
    paginate: paginateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
