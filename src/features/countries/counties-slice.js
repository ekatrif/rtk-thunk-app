import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
  'countries/loadCountries',
  (_,  {
    extra: { client, api }
  }) => {
    return client.get(api.ALL_COUNTRIES)
  }
);

const initialState = {
  status: 'idle',
  error: null,
  list: [],
}
const countrySlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
  }
})

export const countryReducer = countrySlice.reducer;

// Selectors
export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
})

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, {search = '', region = ''}) => state.countries.list
  .filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()) && c.region.includes(region));
