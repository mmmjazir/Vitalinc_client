import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
         
          loadUser: builder.query({
            query: (data) => ({
              url: "me",
              method: "GET",
              credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
           
                const result = await queryFulfilled;
                dispatch(
                  userLoggedIn({
                    accessToken: result.data.accessToken,
                    user: result.data.user,
                  })
                );
            
            },
          }),
    }),
});


export const {useLoadUserQuery} = apiSlice;
