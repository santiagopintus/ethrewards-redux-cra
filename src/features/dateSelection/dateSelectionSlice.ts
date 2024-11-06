import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDateDaysAgoAsISO } from "../../utils/utils";
import { DateSpan } from "../../model/model.interface";

interface DatesState {
  value: DateSpan;
}

const initialState: DatesState = {
  value: {
    since: getDateDaysAgoAsISO(31),
    till: new Date().toISOString(),
  },
};

const dateSelectionSlice = createSlice({
  name: "dateSelection",
  initialState,
  reducers: {
    setDateSpan(state, action: PayloadAction<DateSpan>) {
      state.value = action.payload;
    },
  },
});

// Export actions for setting and clearing the focused block
export const { setDateSpan } = dateSelectionSlice.actions;

export default dateSelectionSlice.reducer;
