import authApi from ".";
import { isApiErrorResponse } from "~/utils/helpers";
import { notifyError, notifySuccess } from "~/utils/toast";

const _loginEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

function useLoginMutation() {
  const [trigger, result] = _loginEndpoint.useLoginMutation();

  const login = async (values: Record<"email" | "password", string>) => {
    try {
      const response = await trigger(values).unwrap();
      notifySuccess("Login Successful");
      return response;
    } catch (error) {
      if (isApiErrorResponse(error)) {
        if (error.status === 400) {
          if (error.data.validationErrors) {
            notifyError(error.data.validationErrors[0].message);
          } else if (error.data.message) {
            const message: string = error.data.message.toLowerCase();
            if (message.includes("duplicate")) {
              if (message.includes("email")) {
                notifyError("Login failed, Email already exists");
              }
            }
          }
        }
      }
    }
  };

  return { login, result };
}

export default useLoginMutation;
