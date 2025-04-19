// import { apiSlice } from "../api/apiSlice";

// export const pharmacyReviewApi = apiSlice.injectEndpoints({
//     endpoints :(builder)=>({

//         addReview: builder.mutation({
//             query: ({pharmacyId,rating, comment}) => ({
//                 url: `add-pharmacy-review/${pharmacyId}`,
//                 method: 'POST',
//                 body: {rating, comment},
//                 credentials: "include" as const
//             })
//         }),

//         editReview: builder.mutation({
//             query: ({reviewId,rating, comment}) => ({
//                 url: `edit-pharmacy-review/${reviewId}`,
//                 method: 'PATCH',
//                 body: {rating, comment},
//                 credentials: "include" as const
//             })
//         }),

//         deleteReview: builder.mutation({
//             query: ({reviewId})=> ({
//                 url: `delete-pharmacy-review/${reviewId}`,
//                 method: 'DELETE',
//                 credentials:"include" as const
//             })
//         }),

//         likeReview: builder.mutation({
//             query: ({reviewId})=> ({
//                 url: `like-review/${reviewId}`,
//                 method: 'PATCH',
//                 credentials:"include" as const
//             })
//         }),

//         getAllReviewsForPharmacy: builder.query({
//             query: ({pharmacyId,page})=> ({
//                 url: `get-pharmacy-reviews/${pharmacyId}?page=${page}`,
//                 method: 'GET',
//                 credentials:"include" as const
//             })
//         }),
//     })
// })

// export const {
//     useAddReviewMutation,
//     useEditReviewMutation,
//     useDeleteReviewMutation,
//     useLikeReviewMutation,
//     useGetAllReviewsForPharmacyQuery
// } = pharmacyReviewApi;

import { apiSlice } from "../api/apiSlice";

export const pharmacyReviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ pharmacyId, rating, comment }) => ({
        url: `add-pharmacy-review/${pharmacyId}`,
        method: "POST",
        body: { rating, comment },
        credentials: "include" as const,
      }),
    }),

    editReview: builder.mutation({
      query: ({ reviewId, rating, comment }) => ({
        url: `edit-pharmacy-review/${reviewId}`,
        method: "PATCH",
        body: { rating, comment },
        credentials: "include" as const,
      }),
      async onQueryStarted(
        { reviewId, pharmacyId, page },
        { queryFulfilled, dispatch }
      ) {
       
          const { data: response } = await queryFulfilled;

          dispatch(
            pharmacyReviewApi.util.updateQueryData(
              "getAllReviewsForPharmacy",
              { pharmacyId, page },
              (draft) => {
                const reviewIndex = draft.reviews.findIndex(
                  (review) => review._id === reviewId
                );
                if (reviewIndex !== -1) {
                  draft.reviews[reviewIndex] = response.review;
                }
              }
            )
          );
      
      },
    }),

    deleteReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: `delete-pharmacy-review/${reviewId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    likeReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: `like-review/${reviewId}`,
        method: "PATCH",
        credentials: "include" as const,
      }),
      async onQueryStarted(
        { reviewId, pharmacyId, currentUser, page },
        { dispatch, queryFulfilled }
      ) {
        
          await queryFulfilled;

          dispatch(
            pharmacyReviewApi.util.updateQueryData(
              "getAllReviewsForPharmacy",
              { pharmacyId, page },
              (draft) => {
                const review = draft.reviews.find((r:any) => r._id === reviewId);
                if (review) {
                  const hasLiked = review.likes.includes(currentUser);

                  if (hasLiked) {
                    review.likes = review.likes.filter(
                      (userId:any) => userId !== currentUser
                    );
                  } else {
                    review.likes.push(currentUser);
                  }
                }
              }
            )
          );
      
      },
    }),

    getAllReviewsForPharmacy: builder.query({
      query: ({ pharmacyId, page }) => ({
        url: `get-pharmacy-reviews/${pharmacyId}?page=${page}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
  useLikeReviewMutation,
  useGetAllReviewsForPharmacyQuery,
} = pharmacyReviewApi;
