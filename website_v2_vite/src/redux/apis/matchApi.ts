// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Explore } from "../types/explore";

// Define a service using a base URL and expected endpoints
export const matchApi = createApi({
  reducerPath: "matchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
      authorization: `Bearer ${JSON.parse(
        localStorage.getItem("token") as string
      )}`,
    },
  }),
  endpoints: (builder) => ({
    // Get User Matches
    getUserMatches: builder.query<Explore, null>({
      query: () => "/users/matches",
    }),

    // Create a Match
    createMatch: builder.mutation<
      Explore,
      { menteeId: string; mentorId: string; requestMessage: string }
    >({
      query: ({ menteeId, mentorId, requestMessage }) => ({
        url: "/matches/create",
        body: {
          match: {
            menteeId,
            mentorId,
            requestMessage,
          },
        },
        method: "POST",
      }),
    }),

    // Update a Match
    updateMatch: builder.mutation<
      Explore,
      { matchId: string; status: string; requestMessage: string }
    >({
      query: ({ matchId, status, requestMessage }) => ({
        url: "/matches/update",
        body: {
          matchId,
          status,
          requestMessage,
        },
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserMatchesQuery, useCreateMatchMutation, useUpdateMatchMutation } = matchApi;
