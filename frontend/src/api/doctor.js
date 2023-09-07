import api from "./api";
import Cookies from "js-cookie";
const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    doctor: build.query({
      query: () => ({
        url: "/doctor",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
      }),
      providesTags: ["doctor"],
    }),
    updateDoctor: build.mutation({
      query: (body) => ({
        url: "/doctor",
        method: "PUT",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["doctor"],
    }),
  }),

  overrideExisting: false,
});

export const { useDoctorQuery, useUpdateDoctorMutation } = loginApi;
