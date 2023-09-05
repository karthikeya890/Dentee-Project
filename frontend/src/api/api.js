import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  reducerPath: "api",
  endpoints: (build) => ({}),
});

export default api;
