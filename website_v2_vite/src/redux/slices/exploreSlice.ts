import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ExploreState {
  explore: [];
}

// Define the initial state using that type
const initialState: ExploreState = {
  explore: [],
};

export const exploreSlice = createSlice({
  name: "explore",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateExplore: (state, action: PayloadAction<[]>) => {
      const newState = { ...state };
      newState.explore = action.payload;
      return newState;
    },
  },
});

export const { updateExplore } = exploreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectExplore = (state: RootState) => state.explore.explore;

export default exploreSlice.reducer;
