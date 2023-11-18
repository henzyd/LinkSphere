import { notifyError, notifySuccess } from "~/utils/toast";
import authApi from ".";
import { isAxiosError } from "axios";

const _passwordEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/reset-password",
        method: "POST",
        data: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/reset-password-confirm",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

function useForgotPasswordMutation() {
  const [trigger, result] = _passwordEndpoint.useForgotPasswordMutation();

  const forgotPassword = async (data: { email: string }) => {
    try {
      const response = await trigger(data).unwrap();
      notifySuccess("Reset link has been sent to your email");
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 400) {
          if (data.validationErrors) {
            notifyError(data.validationErrors[0].message);
          }
        }
      }
    }
  };

  return { forgotPassword, result };
}

function useResetPasswordMutation() {
  const [trigger, result] = _passwordEndpoint.useResetPasswordMutation();

  const resetPassword = async (data: { userId: string; token: string; newPassword: string }) => {
    try {
      const response = await trigger(data).unwrap();
      notifySuccess("Password reset successfully!");
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 400) {
          if (data.validationErrors) {
            notifyError(data.validationErrors[0].message);
          } else if (data.message === "Invalid token") {
            notifyError("Invalid or expired token. Please restart the password reset process.");
          }
        }
      }
    }
  };

  return { resetPassword, result };
}

export { useForgotPasswordMutation, useResetPasswordMutation };
