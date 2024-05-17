import { createApi } from "@reduxjs/toolkit/query/react";
import AxiosBaseQuery from "../axiosBaseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  refetchOnReconnect: true,
  baseQuery: AxiosBaseQuery({
    baseUrl: `https://backend-five-henna.vercel.app/dashboard`,
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => {
        return {
          url: `/chart-data`,
          method: "GET",
       
 
        };
      },
      transformResponse: (response) => response,
    }),
  }),
});
export const { useGetUserDataQuery  } =
dashboardApi;
