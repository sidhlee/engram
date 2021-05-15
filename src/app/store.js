import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';

const reducer = {
  articles: articlesReducer,
};

const store = configureStore({
  reducer,
});

export default store;
