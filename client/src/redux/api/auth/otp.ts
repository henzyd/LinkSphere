import { notifyError, notifySuccess } from "~/utils/toast";
import authApi from ".";
import { isAxiosError } from "axios";

const _otpEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/verify-otp",
        method: "POST",
        data: credentials,
      }),
    }),
    resendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/resend-otp",
        method: "POST",
        data: credentials,
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

  return { resendOtp, result };
}

export { useVerifyOtpMutation, useResendOtpMutation };
