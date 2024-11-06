import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import blocksReducer from "../features/blocks/blocksSlice";
import themeReducer from "../features/theme/themeSlice";
import dateSelectionReducer from "../features/dateSelection/dateSelectionSlice";

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    theme: themeReducer,
    dateSelection: dateSelectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
