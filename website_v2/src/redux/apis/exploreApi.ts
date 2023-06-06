// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import type {Explore} from "../types/explore";

// Define a service using a base URL and expected endpoints
export const exploreApi = createApi({
  reducerPath: "exploreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  }),
  endpoints: builder => ({
    // Get Explore Data
    getExploreData: builder.query<Explore, null>({
      query: () => "/matches/userRecommendations",
    }),

    // Get Explore Data by Content
    getExploreDataByContent: builder.mutation<
      Explore,
      {page: number; limit: number; findMentor: any}
    >({
      query: ({page, limit, findMentor}) => ({
        url: `/matches/searchMentors?page=${page}&limit=${limit}&areasOfInterest=${findMentor.areaOfInterest}&goals=${findMentor.goals}&communicationFrequency=${findMentor.communicationFrequency}&communicationPreferences=${findMentor.communicationPreferences}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetExploreDataQuery, useGetExploreDataByContentMutation} =
  exploreApi;
