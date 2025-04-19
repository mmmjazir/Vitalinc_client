import { apiSlice } from "../api/apiSlice";


export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => ({
                url: `get-all-notifications`,
                method: 'GET',
                credentials: "include" as const,
            })
        }),
        updateNotificationStatus: builder.mutation({
            query: ({ notificationId }) => ({
                url: `update-notification/${notificationId}`,
                method: 'PATCH',
                credentials: "include" as const,
            }),
        }),
    }),
});


export const { 
    useGetNotificationsQuery, 
    useUpdateNotificationStatusMutation
} = notificationApi;