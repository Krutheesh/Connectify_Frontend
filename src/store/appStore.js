import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themReducer from './themeSlice';
import userReducer from './userSlice';

export const appStore = configureStore({
  reducer:{
    auth: authReducer,
    theme: themReducer,
    user: userReducer,
    
  }
})