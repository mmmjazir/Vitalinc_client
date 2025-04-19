import { apiSlice } from "../api/apiSlice";


export const pharmacyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPharmacy: builder.mutation({
            query: (data) => ({
                url: `register-pharmacy`,
                method: 'POST',
                body: data,
                credentials: "include" as const,
            }),
        }),
   
        getPharmacyBySeller: builder.query({
        query:()=> ({
          url: 'get-pharmacy-by-seller',
          method: 'GET',
          credentials:'include' as const,
        }),
        }),

        updatePharmacyName: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacyName/${id}`,
            method: 'PATCH',
            body: data,
            credentials: "include" as const,
        })
        }),
     
       updatePharmacyContactInfo: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacy-ContactInfo/${id}`,
            method: 'PATCH',
            body: data ,
            credentials: "include" as const,
        })
       }),

       updatePharmacyImages: builder.mutation({
        query: ({id,image}) => ({
            url: `update-pharmacy-images/${id}`,
            method: 'PATCH',
            body: {image},
            credentials: "include" as const,
        })
       }),

       deletePharmacyImage: builder.mutation({
        query: ({id,image}) => ({
            url: `delete-pharmacy-image/${id}`,
            method: 'PATCH',
            body: {image},
            credentials: "include" as const,
        })
       }),
    
       updatePharmacyAddress: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacy-address/${id}`,
            method: 'PATCH',
            body: data,
            credentials: "include" as const,
        })
       }),
    
       updatePharmacyLocation: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacy-location/${id}`,
            method: 'PATCH',
            body: data,
            credentials: "include" as const,
        })
       }),

       updatePharmacyHours: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacy-hours/${id}`,
            method: 'PATCH',
            body: data,
            credentials: "include" as const,
        })
       }),

       updatePharmacyServices: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacy-services/${id}`,
            method: 'PATCH',
            body: data,
            credentials: "include" as const,
        })
       }),

       updatePharmacyDelivery: builder.mutation({
        query: ({id,data}) => ({
            url: `update-pharmacy-delivery/${id}`,
            method: 'PATCH',
            body: data,
            credentials: "include" as const,
        })
       }),

       getPharmacyDetails: builder.query({
        query:({pharmacySlug})=> ({
          url: `get-pharmacy-details/${pharmacySlug}`,
          method: 'GET',
          credentials:'include' as const,
        }),
        }),

    })
});

export const {
    useCreatePharmacyMutation,
    useGetPharmacyBySellerQuery,
    useUpdatePharmacyNameMutation,
    useUpdatePharmacyContactInfoMutation,
    useUpdatePharmacyImagesMutation,
    useDeletePharmacyImageMutation,
    useUpdatePharmacyAddressMutation,
    useUpdatePharmacyLocationMutation,
    useUpdatePharmacyHoursMutation,
    useUpdatePharmacyServicesMutation,
    useUpdatePharmacyDeliveryMutation,
    useGetPharmacyDetailsQuery
} = pharmacyApi;