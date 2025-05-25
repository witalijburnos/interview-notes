// redux/savedSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSavedPairs, savePair, deletePair } from '../utils/api';


export const loadSavedPairs = createAsyncThunk(
  'saved/loadSavedPairs',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSavedPairs();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to load saved pairs');
    }
  }
);


export const addPair = createAsyncThunk(
  'saved/addPair',
  async ({ question, answer }, { dispatch }) => {
    await savePair(question, answer);
    dispatch(loadSavedPairs());
  }
);


export const removePair = createAsyncThunk(
  'saved/removePair',
  async (question, { dispatch }) => {
    await deletePair(question);
    dispatch(loadSavedPairs());
  }
);

const initialState = {
  pairs: [],            // [{ question, answer }]
  statusMap: {},        // { [question]: true }
  loading: false,
  error: null,
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSavedPairs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSavedPairs.fulfilled, (state, action) => {
        state.loading = false;
        state.pairs = action.payload;
    
        state.statusMap = action.payload.reduce((acc, pair) => {
          acc[pair.question] = true;
          return acc;
        }, {});
      })
      .addCase(loadSavedPairs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savedSlice.reducer;
