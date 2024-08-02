import { isAxiosError } from "axios";
import authApi from ".";
import { notifyError, notifySuccess } from "~/utils/toast";

const _loginEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        data: credentials,
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
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 400) {
          if (data.validationErrors) {
            notifyError(data.validationErrors[0].message);
          } else if (data.message === "User not verified") {
            notifyError("You have not verified your account");
          } else {
            const message: string = data.message.toLowerCase();
            if (message.includes("duplicate")) {
              if (message.includes("email")) {
                notifyError("Login failed, email already exists");
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
