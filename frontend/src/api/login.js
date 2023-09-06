import api from "./api";
const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
