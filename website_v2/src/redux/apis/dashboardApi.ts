// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Explore } from "../types/explore";

// Define a service using a base URL and expected endpoints
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
    // Get Dashboard Stats
    getDashboardStats: builder.query<Explore, null>({
      query: () => "/admin/statistics",
    }),

    // Get Mentor List
    getMentorList: builder.mutation<Explore, { pageNumber: number }>({
      query: (pageNumber) => ({
        url: `/admin/userList?page=${pageNumber}&limit=20&userType=mentor`,
      }),
    }),

    // Get Mentees List
    getMenteesList: builder.mutation<Explore, { pageNumber: number }>({
      query: (pageNumber) => ({
        url: `/admin/userList?page=${pageNumber}&limit=20&userType=mentee`,
      }),
    }),

    // Get User Profile
    getUserProfile: builder.mutation<Explore, { userId: string }>({
      query: (userId) => ({
        url: `/admin/userProfile?userId=${userId}`,
      }),
    }),

    // Get Session List
    getSessionList: builder.mutation<Explore, null>({
      query: () => ({
        url: "/admin/sessionList",
      }),
    }),

    // Get Search User List
    getSearchUsersList: builder.mutation<Explore, { searchString: string }>({
      query: (searchString) => ({
        url: `/admin/userSearch?searchString=${searchString}`,
      }),
    }),

    // Get Search Sessions List
    getSearchSessionsList: builder.mutation<Explore, { searchString: string }>({
      query: (searchString) => ({
        url: `/admin/sessionSearch?searchString=${searchString}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDashboardStatsQuery,
  useGetMentorListMutation,
  useGetMenteesListMutation,
  useGetUserProfileMutation,
  useGetSessionListMutation,
  useGetSearchUsersListMutation,
  useGetSearchSessionsListMutation,
} = dashboardApi;
