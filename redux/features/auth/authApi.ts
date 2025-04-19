import { apiSlice } from "../api/apiSlice";
import { userForgotPassword, userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
}

type RegistrationData = {}


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        register: builder.mutation<RegistrationResponse,RegistrationData>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            activationToken: result.data.activationToken,
                        })
                      )
                
            }
        }),
        activation: builder.mutation({
            query: ({activation_token,activation_code}) => ({
                url: 'activate-user',
                method: 'POST',
                body:{
                    activation_token,
                    activation_code
                },
            })
        }),
      login: builder.mutation({
        query: ({email,password}) => ({
            url: 'login',
            method:'POST',
            body:{
                email,
                password
            },
            credentials: 'include' as const,
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
         
                const result = await queryFulfilled;
                dispatch(
                    userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    })
                  )
           
        }
      }),
      socialAuth: builder.mutation({
        query: ({email,name,avatar}) => ({
            url: 'social-auth',
            method:'POST',
            body:{
                email,
                name,
                avatar
            },
            credentials: 'include' as const,
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
         
                const result = await queryFulfilled;
                dispatch(
                    userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    })
                  )
           
        }
      }),
      logOut: builder.mutation({
        query: () => ({
          url: "logout",
          method: "POST",
          credentials: "include" as const,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          
     
            const result = await queryFulfilled
            
            if(result){
            dispatch(userLoggedOut());
         }
        
         
        },
      }),
      forgotPassword: builder.mutation({
        query: (email) => ({
            url: 'forgot-password',
            method: 'POST',
            body: email,
            credentials: 'include' as const
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
                const result = await queryFulfilled;
                dispatch(
                    userForgotPassword({
                      ResetPasswordToken: result.data.ResetPasswordToken,
                    })
                  )
          
        }
    }),

    acceptPasswordOtp: builder.mutation({
        query: ({forgotPasswordToken,forgotPasswordOtp}) => ({
            url: 'accept-reset-password-otp',
            method: 'POST',
            body:{
                resetPassword_Token:forgotPasswordToken,
                resetPassword_Otp: forgotPasswordOtp
            },
            credentials: 'include' as const
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
           
                const result = await queryFulfilled;
                dispatch(
                    userForgotPassword({
                      ResetPasswordToken: result.data.ResetToken,
                    })
                  )
        
        }
    }),

    passwordForReset: builder.mutation({
        query: ({newPassword,confirmPassword,ResetPasswordToken}) => ({
            url: 'reset-password',
            method: 'PATCH',
            body:{
                newPassword,
                confirmPassword,
                resetPassword_token:ResetPasswordToken
            },
            credentials: 'include' as const,
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
                const result = await queryFulfilled;
                if(result){
                 dispatch(
                    userForgotPassword({
                      ResetPasswordToken: '',
                    })
                  );
               if(result.data.logoutUser){
                dispatch(
                    userLoggedOut()
                )
               }

                }
               
           
        }
    }),

    })
})

export const {
     useRegisterMutation,
     useActivationMutation,
     useLoginMutation,
     useLogOutMutation,
     useSocialAuthMutation,
     useForgotPasswordMutation,
     useAcceptPasswordOtpMutation,
     usePasswordForResetMutation
    } = authApi