import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./queries";

export const feedApi = createApi({
	reducerPath: "feedApi",
	baseQuery: axiosBaseQuery({
		baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
	}),
	endpoints: (builder) => ({
		getFeed: builder.query({
			query: () => ({ url: "/feed/", method: "get" }),
		}),
	}),
});

export const { useGetFeedQuery } = feedApi;
