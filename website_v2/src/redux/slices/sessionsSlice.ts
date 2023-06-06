import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";

// Define a type for the slice state
interface SessionState {
  sessions: [];
}

// Define the initial state using that type
const initialState: SessionState = {
  sessions: [],
};

export const sessionsSlice = createSlice({
  name: "sessions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateSessions: (state, action: PayloadAction<[]>) => {
      const newState = {...state};
      newState.sessions = action.payload;
      return newState;
    },
  },
});

export const {updateSessions} = sessionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSessions = (state: RootState) => state.sessions.sessions;

export default sessionsSlice.reducer;
