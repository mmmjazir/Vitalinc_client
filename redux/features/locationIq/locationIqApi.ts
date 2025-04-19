import { apiSlice } from "../api/apiSlice";


export const locationIqApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getReverseGeoCoding: builder.query({
            query: ({lat,lng}) => ({
                url: `locationIq/get-reverse-geocoding?lat=${lat}&lon=${lng}`,
                method: 'GET',
                credentials: "include" as const,
            })
        }),
    })
});

export const {
 useLazyGetReverseGeoCodingQuery
} = locationIqApi;