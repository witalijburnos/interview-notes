// redux/videoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTranscript } from '../utils/api';


export const fetchQuestions = createAsyncThunk(
  'video/fetchQuestions',
  async (url, { rejectWithValue }) => {
    try {
      const response = await getTranscript(url);
      if (response.questions) {
        return response.questions;
      } else {
        return rejectWithValue(response.error || 'Invalid data format');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch transcript');
    }
  }
);


const initialState = {
  url: '',
  questions: [],
  loading: false,
  error: null,
};


const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setUrl } = videoSlice.actions;
export default videoSlice.reducer;
