import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './queries';
import { UserProfileT, UserT } from 'types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<
      UserProfileT & { user: Omit<UserT, 'profile'> },
      number
    >({
      query: (user_id: number) => ({
        url: '/account/profile/',
        method: 'get',
        params: { user_id },
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({ url: '/account/profile/', method: 'put', data }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
