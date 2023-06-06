// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import type {UpdateUser, UserInfo, UserLogin} from "../types/user";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  }),
  endpoints: builder => ({
    // Get User Info
    getUserInfo: builder.mutation<UserInfo, null>({
      query: () => "/users/info",
    }),

    // Login User
    loginUser: builder.mutation<
      UserLogin,
      {authCode: string; isLocal?: boolean}
    >({
      query: ({authCode, isLocal}) => ({
        url: "/users/login",
        body: {
          authCode,
          isLocal: isLocal || false,
        },
        method: "POST",
      }),
      transformResponse: (response: UserLogin) => {
        const {token} = response;
        localStorage.setItem("token", JSON.stringify(token));
        return response;
      },
    }),

    // Register User
    registerUser: builder.mutation<
      UserLogin,
      {authCode: string; isLocal?: boolean}
    >({
      query: ({authCode, isLocal}) => ({
        url: "/users/register",
        body: {
          authCode,
          isLocal: isLocal || false,
          type: "linkedInSignup",
        },
        method: "POST",
      }),
      transformResponse: (response: UserLogin) => {
        const {token} = response;
        localStorage.setItem("token", JSON.stringify(token));
        return response;
      },
    }),

    // Update User
    updateUser: builder.mutation<UserLogin, {args: UpdateUser}>({
      query: args => ({
        url: "/users/update",
        body: {...args},
        method: "PUT",
      }),
    }),

    // Chat token
    getUserChatToken: builder.query({
      query: () => "/users/chatToken?",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserInfoMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserChatTokenQuery,
} = userApi;
