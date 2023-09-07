import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  reducerPath: "api",
  tagTypes: ["doctor"],
  endpoints: () => ({}),
});

export default api;
