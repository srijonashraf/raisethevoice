import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./queries";

export const feedApi = createApi({
	reducerPath: "feedApi",
	baseQuery: axiosBaseQuery({
		baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
	}),
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => ({ url: "/feed/", method: "get" }),
		}),
		getSinglePost: builder.query({
			query: (id: number) => ({ url: `/feed/${id}`, method: "get" }),
		}),
		getTrendingPosts: builder.query({
			query: () => ({ url: "/feed/trending/", method: "get" }),
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetSinglePostQuery,
	useGetTrendingPostsQuery,
} = feedApi;
