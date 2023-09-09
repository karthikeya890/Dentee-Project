import api from "./api";
import Cookies from "js-cookie";
const clinicApi = api.injectEndpoints({
  endpoints: (build) => ({
    clinics: build.query({
      query: () => ({
        url: "/clinic/all",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
      }),
      providesTags: ["clinics"],
    }),
    addClinic: build.mutation({
      query: (body) => ({
        url: "/clinic",
        method: "POST",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["clinics"],
    }),
  }),

  overrideExisting: false,
});

export const { useClinicsQuery, useAddClinicMutation } = clinicApi;
