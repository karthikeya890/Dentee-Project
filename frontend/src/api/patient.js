import api from "./api";
import Cookies from "js-cookie";
const clinicApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPatients: build.query({
      query: () => ({
        url: "/patient/all",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
      }),
      providesTags: ["patients"],
    }),
    addPatient: build.mutation({
      query: (body) => ({
        url: "/patient",
        method: "POST",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["patients"],
    }),
    updatePatient: build.mutation({
      query: (body) => ({
        url: "/patient",
        method: "PUT",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["patients"],
    }),
    deletePatient: build.mutation({
      query: (body) => ({
        url: "/patient",
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["patients"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddPatientMutation,
  useGetPatientsQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = clinicApi;
