import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './queries';

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
  }),
  endpoints: (builder) => ({
    getFollowedUsers: builder.query({
      query: () => ({
        url: '/account/follow/',
        method: 'get',
      }),
    }),
    getFollowSuggestion: builder.query({
      query: () => ({
        url: '/account/follow/',
        method: 'get',
        params: { type: 'suggestion' },
      }),
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: '/account/follow/',
        method: 'post',
        params: data,
      }),
    }),
  }),
});

export const {
  useGetFollowedUsersQuery,
  useGetFollowSuggestionQuery,
  useFollowUserMutation,
} = followApi;
