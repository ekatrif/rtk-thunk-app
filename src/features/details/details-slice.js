import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
  '@@details/loadCountryByName',
  (name, {
    extra: { client, api }
  }) => {
    return client.get(api.searchByCountry(name))
  }
);

export const loadNeighboursByBorder = createAsyncThunk(
  '@@details/loadNeighboursByBorder',
  (borders, {
    extra: { client, api }
  }) => {
    return client.get(api.filterByCode(borders))
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
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'received';
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadNeighboursByBorder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadNeighboursByBorder.fulfilled, (state, action) => {
        state.status = 'received';
        state.neighbours = action.payload.data.map(c => c.name.common);
      })
      .addCase(loadNeighboursByBorder.rejected, (state, action) => {
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
export const selectNeighbours = (state) => state.details.neighbours;
