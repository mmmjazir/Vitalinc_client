import { apiSlice } from "../api/apiSlice";


export const medicinesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMedicine: builder.mutation({
            query: (formData) => ({
                url: `create-medicine`,
                method: 'POST',
                body: formData,
                credentials: "include" as const,
            }),
        }),
        getMedicinesForInventory: builder.query({
            query: ({page,search}) => ({
                url: `get-medicines-inventory?page=${page}&search=${search}`,
                method: 'GET',
                credentials: "include" as const,
            })
        }),
        getSingleMedicineForInventory: builder.query({
            query: ({medicineId}) => ({
                url: `get-single-medicine-inventory/${medicineId}`,
                method: 'GET',
                credentials: "include" as const,
            })
        }),
        updateMedicineAvailability: builder.mutation({
            query: ({ medicineId, isAvailable, quantity }) => ({
                url: `update-medicine-availability/${medicineId}`,
                method: 'PATCH',
                body: { isAvailable, quantity },
                credentials: "include" as const,
            }),
        }),
        bulkUpdateMedicineAvailability: builder.mutation({
            query: ({ medicineIds, isAvailable }) => ({
                url: `update-medicines-availability`,
                method: 'PATCH',
                body: { medicineIds, isAvailable },
                credentials: "include" as const,
            }),
        }),
        editMedicine: builder.mutation({
            query: ({ medicineId,formData }) => ({
                url: `edit-medicine/${medicineId}`,
                method: 'PUT',
                body: formData,
                credentials: 'include' as const,
            }),
        }),
        deleteMedicine: builder.mutation({
            query: ({ medicineId }) => ({
                url: `delete-medicine/${medicineId}`,
                method: 'DELETE',
                credentials: 'include' as const,
            }),
        }),
        getAllMedicines: builder.query({
            query: ({lat,lng,searchQuery,page,sort}) => ({
                url: `get-all-medicines?lat=${lat}&lng=${lng}&page=${page}&searchQuery=${searchQuery}&sort=${sort}`,
                method: 'GET',
                credentials: "include" as const,                
            }),
        }),
      getMedicineDetails: builder.query({
        query: ({medicineSlug}) => ({
            url: `get-medicine-details/${medicineSlug}`,
            method: 'GET',
            credentials: "include" as const,                
        }),
      }),
       
    getMedicinesByPharmacy: builder.query({
        query: ({pharmacyId,page,searchQuery,sort}) => ({
            url: `get-medicines-by-pharmacy/${pharmacyId}?page=${page}&searchQuery=${searchQuery}&sort=${sort}`,
            method: 'GET',
            credentials: "include" as const,
        }),
    })
    })
});

export const {
 useCreateMedicineMutation,
 useGetMedicinesForInventoryQuery,
 useGetSingleMedicineForInventoryQuery,
 useUpdateMedicineAvailabilityMutation,
 useBulkUpdateMedicineAvailabilityMutation,
 useEditMedicineMutation,
 useDeleteMedicineMutation,
 useGetAllMedicinesQuery,
 useGetMedicineDetailsQuery,
 useGetMedicinesByPharmacyQuery
} = medicinesApi;