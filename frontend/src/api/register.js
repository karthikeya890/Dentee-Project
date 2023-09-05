import api from "./api";
const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useRegisterMutation } = registerApi;
