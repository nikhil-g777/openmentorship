import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./slices/userSlice";
import sessionsReducer from "./slices/sessionsSlice";
import mentorApplicationsReducer from "./slices/mentorApplicationsSlice";
import matchReducer from "./slices/matchSlice";
import exploreReducer from "./slices/exploreSlice";
import dashboardReducer from "./slices/dashboardSlice";
import { userApi } from "./apis/userApi";
import { exploreApi } from "./apis/exploreApi";
import { matchApi } from "./apis/matchApi";
import { dashboardApi } from "./apis/dashboardApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sessions: sessionsReducer,
    mentorApplications: mentorApplicationsReducer,
    match: matchReducer,
    explore: exploreReducer,
    dashboard: dashboardReducer,
    [userApi.reducerPath]: userApi.reducer,
    [exploreApi.reducerPath]: exploreApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      exploreApi.middleware,
      matchApi.middleware,
      dashboardApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
