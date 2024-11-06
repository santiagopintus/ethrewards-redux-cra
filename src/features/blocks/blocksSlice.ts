import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Block, DateSpan } from "../../model/model.interface";
import { fetchEthRewards } from "./blocksAPI";

interface BlocksState {
  value: Block[] | null;
  focusedBlock: Block | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlocksState = {
  value: null,
  focusedBlock: null,
  status: "idle",
  error: null,
};

// Async thunk for fetching blocks data
export const fetchBlocks = createAsyncThunk(
  "blocks/fetchBlocks",
  async (dates: DateSpan) => {
    return await fetchEthRewards(dates);
  }
);

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setFocusedBlock(state, action: PayloadAction<Block>) {
      state.focusedBlock = action.payload;
    },
    clearFocusedBlock(state) {
      state.focusedBlock = null;
    },
    clearBlocks(state) {
      state.value = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchBlocks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch blocks";
      });
  },
});

// Export actions for setting and clearing the focused block
export const { setFocusedBlock, clearFocusedBlock, clearBlocks } =
  blocksSlice.actions;

export default blocksSlice.reducer;
