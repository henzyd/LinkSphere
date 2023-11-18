import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "~/utils/constants";
import { axiosBaseQuery } from "..";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
  }),
  endpoints: () => ({}),
});

export default authApi;
