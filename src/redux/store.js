// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice';
import answerReducer from './answerSlice';
import savedReducer from './savedSlice';

const store = configureStore({
  reducer: {
    video: videoReducer,
    answers: answerReducer,
    saved: savedReducer,
  },
});

export default store;
