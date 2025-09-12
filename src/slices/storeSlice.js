import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],           // list of stores ownes by owere are her 
  totalStores: 0,       
  selectedStoreId:[], // currently selected store
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
      // optionally select the first store by default
      if (action.payload.length > 0 && !state.selectedStoreId) {
        state.selectedStoreId = action.payload[0].id;
      }
    },
    setSelectedStore: (state, action) => {
      state.selectedStoreId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStores, setSelectedStore, setLoading, setError } = storeSlice.actions;
export default storeSlice.reducer;
