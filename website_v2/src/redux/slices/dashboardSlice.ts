import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface DashboardState {
  stats: object;
  mentorsList: object;
  menteesList: object;
  user: object;
  activeSessions: [];
  closedSessions: [];
  mentor: object;
  userSearchResult: [];
}

// Define the initial state using that type
const initialState: DashboardState = {
  stats: {},
  mentorsList: {},
  menteesList: {},
  user: {},
  activeSessions: [],
  closedSessions: [],
  mentor: {},
  userSearchResult: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateStats: (state, action: PayloadAction<object>) => {
      const newState = { ...state };
      newState.stats = action.payload;
      return newState;
    },
    updateMentorsList: (state, action: PayloadAction<object>) => {
      const newState = { ...state };
      newState.mentorsList = action.payload;
      return newState;
    },
    updateMenteesList: (state, action: PayloadAction<object>) => {
      const newState = { ...state };
      newState.menteesList = action.payload;
      return newState;
    },
    updateUser: (state, action: PayloadAction<object>) => {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    },
    updateActiveSessions: (state, action: PayloadAction<[]>) => {
      const newState = { ...state };
      newState.activeSessions = action.payload;
      return newState;
    },
    updateClosedSessions: (state, action: PayloadAction<[]>) => {
      const newState = { ...state };
      newState.closedSessions = action.payload;
      return newState;
    },
    updateMentor: (state, action: PayloadAction<object>) => {
      const newState = { ...state };
      newState.mentor = action.payload;
      return newState;
    },
    updateUserSearchResult: (state, action: PayloadAction<[]>) => {
      const newState = { ...state };
      newState.userSearchResult = action.payload;
      return newState;
    },
  },
});

export const {
  updateStats,
  updateMentorsList,
  updateMenteesList,
  updateUser,
  updateActiveSessions,
  updateClosedSessions,
  updateMentor,
  updateUserSearchResult,
} = dashboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStats = (state: RootState) => state.dashboard.stats;
export const selectMentorsList = (state: RootState) =>
  state.dashboard.mentorsList;
export const selectMenteesList = (state: RootState) =>
  state.dashboard.menteesList;
export const selectUser = (state: RootState) => state.dashboard.user;
export const selectActiveSessions = (state: RootState) =>
  state.dashboard.activeSessions;
export const selectClosedSessions = (state: RootState) =>
  state.dashboard.closedSessions;
export const selectMentor = (state: RootState) => state.dashboard.mentor;
export const selectUserSearchResult = (state: RootState) =>
  state.dashboard.userSearchResult;

export default dashboardSlice.reducer;
