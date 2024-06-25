import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginateState {
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PaginateState = {
  currentPage: 1,
  itemsPerPage: 54,
};

const paginateSlice = createSlice({
  name: "paginate",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setCurrentPage, setItemsPerPage } = paginateSlice.actions;

export default paginateSlice.reducer;
