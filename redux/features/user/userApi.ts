import { apiSlice } from "../api/apiSlice";
import { userChangeEmail } from "../auth/authSlice";
import { medicinesApi } from "../medicine/medicineApi";
import { pharmacyApi } from "../pharmacy/pharmacyApi";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: ({ avatar }) => ({
        url: "update-user-avatar",
        method: "PATCH",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateName: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-name",
        method: "PATCH",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
 

    togglePharmacyFavorite: builder.mutation({
      query: ({ pharmacyId }) => ({
        url: `toggle-pharmacy-favorite/${pharmacyId}`,
        method: "PATCH",
        credentials: "include" as const,
      }),

        async onQueryStarted({ pharmacySlug, type  }, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          const isFavorite = data.isFavorite; 
          if(type === "getPharmacyDetails"){
            dispatch(
              pharmacyApi.util.updateQueryData(
                'getPharmacyDetails',
                { pharmacySlug },
                (draft: any) => {
                  if (draft?.pharmacy) {
                    draft.pharmacy.isFavorite = isFavorite
                   }
                }
              )
            );
          
          }
       
      }
    }),

    toggleMedicineFavorite: builder.mutation({
      query: ({ medicineId }) => ({
        url: `toggle-medicine-favorite/${medicineId}`,
        method: "PATCH",
        credentials: "include" as const,
      }),

      async onQueryStarted(
        { medicineId, source },
        { dispatch, queryFulfilled }
      ) {
       
          const { data } = await queryFulfilled;
          const isFavorite = data.isFavorite;
          const updateMedicineFavorite = (medicine: any) => {
            if (medicine?._id === medicineId) {
              return {
                ...medicine,
                isFavorite,
              };
            }
            return medicine;
          };
    
          // Handle updates based on the `source`
          switch (source?.type) {
            case "getMedicinesByPharmacy":
              dispatch(
                medicinesApi.util.updateQueryData(
                  "getMedicinesByPharmacy",
                  source.params,
                  (draft: any) => {
                    if (draft?.medicines) {
                      draft.medicines = draft.medicines.map(updateMedicineFavorite);
                    }
                  }
                )
              );
              break;
    
            case "getAllMedicines":
              dispatch(
                medicinesApi.util.updateQueryData(
                  "getAllMedicines",
                  source.params,
                  (draft: any) => {
                    if (draft?.medicines) {
                      draft.medicines = draft.medicines.map(updateMedicineFavorite);
                    }
                  }
                )
              );
              break;
    
            case "getMedicineDetails":
              dispatch(
                medicinesApi.util.updateQueryData(
                  "getMedicineDetails",
                  source.params,
                  (draft: any) => {
                    if (draft?.data) {
                      draft.data.isFavorite = isFavorite;
                    }
                  }
                )
              );
              break;
    
            default:
              console.warn("Unknown source type:", source);
          }
    
      },

    }),



  updatePassword: builder.mutation({
      query: (data) => ({
        url: "update-user-password",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getUserMedicineFavorites: builder.query({
      query: () => ({
        url: "get-user-medicine-favorites",
        method: "GET",
        credentials: "include" as const,
      }),
    }),


    getUserPharmacyFavorites: builder.query({
      query: () => ({
        url: "get-user-pharmacy-favorites",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

  }),
  
});

export const {
  useUpdateAvatarMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
  // useGetAllUsersQuery,
  useToggleMedicineFavoriteMutation,
  useTogglePharmacyFavoriteMutation,
  useGetUserMedicineFavoritesQuery,
  useGetUserPharmacyFavoritesQuery
} = userApi;
