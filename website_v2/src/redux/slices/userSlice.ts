import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";

// Define a type for the slice state
interface UserState {
  user: object;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUser: (state, action: PayloadAction<object>) => {
      const newState = {...state};
      newState.user = action.payload;
      return newState;
    },
  },
});

export const {updateUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
