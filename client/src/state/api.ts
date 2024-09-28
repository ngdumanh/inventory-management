import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
interface VerifyTokenResponse {
  userId: string;
  isValid: boolean;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyToken: build.query<VerifyTokenResponse, void>({
      query: () => ({
        url: "verify-token",
        method: "GET",
        headers: {
          "x-access-token": Cookies.get("token") || "",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyTokenQuery } = api;
