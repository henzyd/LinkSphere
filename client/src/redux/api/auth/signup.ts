import { isAxiosError } from "axios";
import { notifyError, notifySuccess } from "~/utils/toast";
import authApi from ".";

const _signupEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

function useSignupMutation() {
  const [trigger, result] = _signupEndpoint.useSignupMutation();

  const signup = async (values: Record<"email" | "password" | "username", string>) => {
    try {
      const response = await trigger(values).unwrap();
      notifySuccess("Signup successfully");
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 400) {
          if (data.validationErrors) {
            notifyError(data.validationErrors[0].message);
          } else if (data.message) {
            const message: string = data.message.toLowerCase();
            if (message.includes("duplicate")) {
              if (message.includes("email")) {
                notifyError("Signup failed, Email already exists");
              } else if (message.includes("username")) {
                notifyError("Signup failed, Username already exists");
              }
            }
          }
        }
      }
    }
  };

  return { signup, result };
}

export default useSignupMutation;
