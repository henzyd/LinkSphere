import { isApiErrorResponse } from "~/utils/helpers";
import { notifyError, notifySuccess } from "~/utils/toast";
import authApi from ".";

const _otpEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/verify-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/resend-otp",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

function useVerifyOtpMutation() {
  const [trigger, result] = _otpEndpoint.useVerifyOtpMutation();

  const verifyOtp = async (values: { code: number }) => {
    try {
      const response = await trigger(values).unwrap();
      notifySuccess("Account verified successfully!");
      return response;
    } catch (error) {
      if (isApiErrorResponse(error)) {
        if (error.status === 400) {
          if (error.data.validationErrors) {
            notifyError(error.data.validationErrors[0].message);
          }
        }
      }
    }
  };

  return { verifyOtp, result };
}

function useResendOtpMutation() {
  const [trigger, result] = _otpEndpoint.useResendOtpMutation();

  const resendOtp = async (values: { email: string }) => {
    try {
      const response = await trigger(values).unwrap();
      notifySuccess("A new otp has been sent to your mail");
      return response;
    } catch (error) {
      if (isApiErrorResponse(error)) {
        if (error.status === 400) {
          if (error.data.validationErrors) {
            notifyError(error.data.validationErrors[0].message);
          }
        }
      }
    }
  };

  return { resendOtp, result };
}

export { useVerifyOtpMutation, useResendOtpMutation };
