import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./queries";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: axiosBaseQuery({
		baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
	}),
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (data: any) => ({
				url: "/v1/user/register/",
				method: "post",
				data,
			}),
		}),
		loginUser: builder.mutation({
			query: (data: any) => ({
				url: "/v1/user/chat-login/",
				method: "post",
				data,
			}),
		}),
	}),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
