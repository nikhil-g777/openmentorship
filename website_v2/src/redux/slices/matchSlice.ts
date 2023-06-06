import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";

// Define a type for the slice state
interface MatchState {
  matches: object;
  newMatch: object;
  updatedMatch: object;
}

// Define the initial state using that type
const initialState: MatchState = {
  matches: {},
  newMatch: {},
  updatedMatch: {},
};

export const matchSlice = createSlice({
  name: "match",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateMatches: (state, action: PayloadAction<[]>) => {
      const newState = {...state};
      newState.matches = action.payload;
      return newState;
    },
    updateUpdatedMatch: (state, action: PayloadAction<[]>) => {
      const newState = {...state};
      newState.updatedMatch = action.payload;
      return newState;
    },
    updateNewMatch: (state, action: PayloadAction<[]>) => {
      const newState = {...state};
      newState.newMatch = action.payload;
      return newState;
    },
  },
});

export const {updateMatches, updateUpdatedMatch, updateNewMatch} =
  matchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMatches = (state: RootState) => state.match.matches;
export const selectUpdatedMatch = (state: RootState) =>
  state.match.updatedMatch;
export const selectNewMatch = (state: RootState) => state.match.newMatch;

export default matchSlice.reducer;
