import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface MentorAppliationsState {
  mentor: object;
  mentorApplications: object
}

// Define the initial state using that type
const initialState: MentorAppliationsState = {
    mentor: {},
    mentorApplications: {}
};

export const mentorApplicationsSlice = createSlice({
  name: "mentorApplications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateMentorApplications: (state, action: PayloadAction<[]>) => {
      const newState = { ...state };
      newState.mentorApplications = action.payload;
      return newState;
    },
    updateMentor: (state, action: PayloadAction<[]>) => {
      const newState = { ...state };
      newState.mentor = action.payload;
      return newState;
    },
  },
});

export const { updateMentorApplications, updateMentor } = mentorApplicationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMentorApplications = (state: RootState) => state.mentorApplications.mentorApplications;
export const selectMentor = (state: RootState) => state.mentorApplications.mentor;

export default mentorApplicationsSlice.reducer;
