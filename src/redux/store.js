import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer
  },
});

export default store;
