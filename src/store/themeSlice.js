// store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial theme from localStorage
const initialTheme = localStorage.getItem('streamify-theme') || 'coffee';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
      localStorage.setItem('streamify-theme', newTheme);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
