import api from "./api";
import Cookies from "js-cookie";
const eventApi = api.injectEndpoints({
  endpoints: (build) => ({
    events: build.query({
      query: () => ({
        url: "/event/all",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
      }),
      providesTags: ["events"],
    }),
    addEvent: build.mutation({
      query: (body) => ({
        url: "/event",
        method: "POST",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["events"],
    }),
    deleteEvent: build.mutation({
      query: (body) => ({
        url: "/event",
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["events"],
    }),
    updateEvent: build.mutation({
      query: (body) => ({
        url: "/event",
        method: "PUT",
        headers: {
          Authorization: `${Cookies.get("jwtToken")}`,
        },
        body,
      }),
      invalidatesTags: ["events"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddEventMutation,
  useEventsQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = eventApi;
