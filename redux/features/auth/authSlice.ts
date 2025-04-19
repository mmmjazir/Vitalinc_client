import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    ResetPasswordToken: '',
    updateEmailToken: '',
    user: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        userRegistration: (state,action) => {
            state.token = action.payload.activationToken;
        },
        userForgotPassword: (state,action) => {
           state.ResetPasswordToken = action.payload.ResetPasswordToken
        },
        userLoggedIn: (state,action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.token = '';
            state.user = ''
        }
    }
})

export const {userRegistration,userLoggedIn,userLoggedOut,userForgotPassword,userChangeEmail} = authSlice.actions;

export default authSlice.reducer;