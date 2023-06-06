// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import type {Explore} from "../types/explore";

// Define a service using a base URL and expected endpoints
export const mentorApplicationsApi = createApi({
  reducerPath: "mentorApplicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  }),
  endpoints: builder => ({
    // Get Sessions
    getSessions: builder.query<Explore, null>({
      query: () => ({
        url: "/sessions/sessionList",
      }),
    }),

    // End Chat Session
    endChatSession: builder.mutation<Explore, {data: any}>({
      query: data => ({
        url: "/matches/update",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetSessionsQuery, useEndChatSessionMutation} =
  mentorApplicationsApi;
