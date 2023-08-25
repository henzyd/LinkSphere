import { isApiErrorResponse } from "~/utils/helpers";
import { notifyError, notifySuccess } from "~/utils/toast";
import authApi from ".";

const _signupEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

function useSignupMutation() {
  const [trigger, result] = _signupEndpoint.useSignupMutation();

  const signup = async (
    values: Record<"email" | "password" | "username", string>
  ) => {
    try {
      await trigger(values).unwrap();
      notifySuccess("Signup successfully");
    } catch (error) {
      if (isApiErrorResponse(error)) {
        if (error.status === 400) {
          if (error.data.validationErrors) {
            notifyError(error.data.validationErrors[0].message);
          } else if (error.data.message) {
            const message: string = error.data.message.toLowerCase();
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
