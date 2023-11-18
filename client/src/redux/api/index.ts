import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { REFRESH_TOKEN_KEY } from "~/utils/constants";
import { notifyError } from "~/utils/toast";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const axiosPrivate = axios.create();

const refreshPromise: Promise<any> | null = null;

axiosPrivate.defaults.headers.common.Accept = "application/json";
axiosPrivate.defaults.headers.post["Content-Type"] = "application/json";

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.response?.data?.non_field_errors ||
      error?.response?.data ||
      error?.message ||
      "Network Error";

    const status = error?.response?.status;

    if (status === 401) {
      if (message === "Token is invalid or expired" || message === "Token is blacklisted") {
        // logout();
      } else if (
        message === "Given token not valid for any token type" ||
        message === "Authentication credentials were not provided."
      ) {
        const token = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (token) {
          if (!refreshPromise) {
            // refreshPromise = refreshToken(token).then(() => {
            //   refreshPromise = null;
            // });
          }

          try {
            // const { data } = await refreshPromise;

            // localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
            // axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + data.access;

            return axiosPrivate.request(error?.config);
          } catch (e) {
            // logout();
          }
        } else {
          // logout();
        }
      } else if (status === 500) {
        notifyError("Something went wrong. Please try again later.");

        return Promise.reject(message);
      } else return Promise.reject(message);
    } else return Promise.reject(message);
  },
);

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const response = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: response.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return { error: err };
    }
  };
