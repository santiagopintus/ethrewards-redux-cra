// src/test/TestProvider.tsx
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from "../features/blocks/blocksSlice"; // Adjust the path as necessary
import themeReducer from "../features/theme/themeSlice"; // Adjust the path as necessary
import dateSelectionReducer from "../features/dateSelection/dateSelectionSlice";
import { RootState } from "../app/store";
import { Block } from "../model/model.interface";

interface TestProviderProps {
  testPopulated: boolean;
  children: ReactNode;
}

const createMockStore = (initialState: RootState) => {
  return configureStore({
    reducer: {
      blocks: blocksReducer,
      theme: themeReducer,
      dateSelection: dateSelectionReducer,
    },
    preloadedState: initialState,
  });
};

/** This Provider is specifically for testing only */
const TestProvider: React.FC<TestProviderProps> = ({
  testPopulated,
  children,
}) => {
  // Define mock data for a populated initial state
  const populatedState: RootState = {
    blocks: {
      value: [
        { reward: 1000, date: { date: "2024-10-01" } },
        { reward: 1500, date: { date: "2024-10-14" } },
        { reward: 2000, date: { date: "2024-10-24" } },
      ] as Block[] | null,
      focusedBlock: { date: { date: "2023-01-01" }, reward: 10 },
      status: "succeeded" as "idle" | "loading" | "succeeded" | "failed",
      error: null,
    },
    dateSelection: {
      value: { since: "2023-01-01", till: "2023-01-02" },
    },
    theme: {
      isDarkMode: true,
    },
  };

  // Define an empty initial state for testing without populated data
  const emptyState: RootState = {
    blocks: {
      value: null,
      focusedBlock: null,
      status: "idle" as "idle" | "loading" | "succeeded" | "failed",
      error: null,
    },
    dateSelection: {
      value: { since: "2024-10-05", till: "2024-11-05" },
    },
    theme: {
      isDarkMode: true,
    },
  };

  // Choose initial state based on testPopulated value
  const initialState = testPopulated ? populatedState : emptyState;

  // Create the mock store with the selected initial state
  const store = createMockStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};

export default TestProvider;
