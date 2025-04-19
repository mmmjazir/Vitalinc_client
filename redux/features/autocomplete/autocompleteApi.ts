import { apiSlice } from "../api/apiSlice";


export const autocompleteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlaceNameAutocomplete: builder.query({
            query: ({query}) => ({
                url: `autocomplete/get-placename-autocomplete?query=${query}`,
                method: 'GET',
                credentials: "include" as const,
            })
        }),
    })
});

export const {
 useLazyGetPlaceNameAutocompleteQuery,
} = autocompleteApi;