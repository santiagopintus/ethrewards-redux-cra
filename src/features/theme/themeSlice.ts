// src/features/theme/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: true, // Default theme mode
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode; // Toggle between light and dark mode
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload; // Set specific theme mode
    },
  },
});

// Export actions to toggle or set the theme
export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
