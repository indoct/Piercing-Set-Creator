import { configureStore, combineReducers } from "@reduxjs/toolkit";
import piercingsReducer from "../features/piercings/piercingsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import sessionReducer from "../features/session/sessionSlice";
import paginateReducer from "../features/pagination/paginateSlice";

const reducer = combineReducers({
  piercings: piercingsReducer,
  filters: filtersReducer,
  session: sessionReducer,
  paginate: paginateReducer,
})

export const store = configureStore({ reducer });

export function setupStore(preloadedState: Partial<RootState> = {}) {
  return configureStore({ reducer, preloadedState })
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
