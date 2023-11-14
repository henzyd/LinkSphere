import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "~/utils/constants";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/users`,
  }),
  tagTypes: ["_currentUser"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<CurrentUser, void>({
      query: () => ({ url: "/me" }),
      providesTags: ["_currentUser"],
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
export default userApi;
