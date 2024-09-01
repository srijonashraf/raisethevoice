import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './queries';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
  }),
  tagTypes: ['Feed'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({ url: '/feed/', method: 'get', params }),
      providesTags: ['Feed'],
    }),
    createPost: builder.mutation({
      query: (data) => ({ url: '/feed/', method: 'post', data }),
      invalidatesTags: ['Feed'],
    }),
    getSinglePost: builder.query({
      query: (id: number) => ({ url: `/feed/${id}`, method: 'get' }),
    }),
    getExploredPosts: builder.query({
      query: (params) => ({ url: '/feed/explore', method: 'get', params }),
      providesTags: ['Feed'],
    }),
    getTrendingPosts: builder.query({
      query: () => ({ url: '/feed/trending/', method: 'get' }),
    }),
    submitVote: builder.mutation({
      query: ({ postId, voteType }) => ({
        url: `/feed/${postId}/vote/${voteType}/`,
        method: 'post',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetExploredPostsQuery,
  useGetTrendingPostsQuery,
  useSubmitVoteMutation,
} = feedApi;
