import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './queries';
import { CommentT, PostT } from 'types/feed';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
  }),
  tagTypes: ['Feed'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostT[], any>({
      query: (params) => ({ url: '/feed/', method: 'get', params }),
      providesTags: ['Feed'],
    }),
    getUserPosts: builder.query<PostT[], any>({
      query: (params) => ({ url: '/feed/my-posts/', method: 'get', params }),
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
    getComments: builder.query<CommentT[], number>({
      query: (postId: number) => ({
        url: `/feed/comment/${postId}/`,
        method: 'get',
      }),
    }),
    submitComment: builder.mutation<CommentT, any>({
      query: ({ postId, ...data }: any) => ({
        url: `/feed/comment/${postId}/`,
        method: 'post',
        data,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetExploredPostsQuery,
  useGetTrendingPostsQuery,
  useSubmitVoteMutation,
  useGetCommentsQuery,
  useSubmitCommentMutation,
} = feedApi;
