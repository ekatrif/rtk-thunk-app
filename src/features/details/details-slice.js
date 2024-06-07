import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
  '@@details/loadCountryByName',
  (name, {
    extra: { client, api }
  }) => {
    return client.get(api.searchByCountry(name))
  }
);

const initialState = {
  currentCountry: null,
  neighbours: [],
  status: 'idle',
  error: null,
}

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDeails: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'received';
        state.currentCountry = action.payload.loadCountryByName[0];
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
  },
})

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

//selectors
export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
