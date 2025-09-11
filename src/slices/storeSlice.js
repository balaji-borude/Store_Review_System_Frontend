import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],        // list of stores
  totalStores: 0,    // count
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload;
      state.totalStores = action.payload.length;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStores, setLoading, setError } = storeSlice.actions;
export default storeSlice.reducer;
