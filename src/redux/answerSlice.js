// redux/answerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAnswer } from '../utils/api';


export const fetchAnswer = createAsyncThunk(
  'answers/fetchAnswer',
  async (question, { rejectWithValue }) => {
    try {
      const response = await getAnswer(question);
      return { question, answer: response.answer };
    } catch (error) {
      return rejectWithValue({ question, error: error.message || 'Error fetching answer' });
    }
  }
);

const initialState = {
  answers: {},           
  loading: {},         
  error: {},             
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswer.pending, (state, action) => {
        const question = action.meta.arg;
        state.loading[question] = true;
        state.error[question] = null;
      })
      .addCase(fetchAnswer.fulfilled, (state, action) => {
        const { question, answer } = action.payload;
        state.answers[question] = answer;
        state.loading[question] = false;
      })
      .addCase(fetchAnswer.rejected, (state, action) => {
        const { question, error } = action.payload;
        state.loading[question] = false;
        state.error[question] = error;
      });
  },
});

export default answerSlice.reducer;
