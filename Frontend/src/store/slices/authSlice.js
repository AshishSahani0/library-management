import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading : false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers:{
    registerRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
    },
    registerSuccess(state, action){
      state.loading = false,
      state.message = action.payload.message;
      
    },
    registerFailed(state, action){
      state.loading = false,
      state.error = action.payload;
      
    },
    otpVerificationRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
      

    },
    otpVerificationSuccess(state, action){
      state.loading = false,
      state.message = action.payload.message,
      state.isAuthenticated = true;
      state.user = action.payload.user;
      
    },
    otpVerificationFailed(state, action){
      state.loading = false,
      state.error = action.payload;
    },
    loginRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
    },
    loginSuccess(state, action){
      state.loading = false,
      state.message = action.payload.message;
      state.isAuthenticated = true,
      state.user = action.payload.user;
      
    },
    loginFailed(state, action){
      state.loading = false,
      state.error = action.payload;
    },
    logoutRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
    },
    logoutSuccess(state, action){
      state.loading = false,
      state.message = action.payload;
      state.isAuthenticated = false,
      state.user = null;
      
    },
    logoutFailed(state, action){
      state.loading = false,
      state.error = action.payload,
      state.message = null;
    },
    getUserRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;

    },
    getUserSuccess(state, action){
      state.loading = false,
      state.isAuthenticated = true,
      state.user = action.payload.user;
      
    },
    getUserFailed(state){ 
      state.loading = false,
      state.user = null,
      state.isAuthenticated = false;
      
    },
    forgotPasswordRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
    },
    forgotPasswordSuccess(state, action){   
      state.loading = false,
      state.message = action.payload;
      
    },
    forgotPasswordFailed(state, action){
      state.loading = false,
      state.error = action.payload;
    },
    resetPasswordRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
    },
    resetPasswordSuccess(state, action){
      state.loading = false,
      state.message = action.payload.message,
      state.user = action.payload.user,
      state.isAuthenticated = true;
      
    },
    resetPasswordFailed(state, action){
      state.loading = false,
      state.error = action.payload;
    },
    updatePasswordRequest(state){
      state.loading = true,
      state.error = null,
      state.message = null;
    },
    updatePasswordSuccess(state, action){
      state.loading = false,
      state.message = action.payload.message;
    
    },
    updatePasswordFailed(state,action){
      state.loading = false,
      state.error = action.payload;
    },

    resetAuthSlice(state){
      state.loading = false,
      state.error = null,
      state.message = null,
      state.isAuthenticated = state.isAuthenticated,
      state.user = state.user;
    }
  }
});

export const resetAuthSlice = ()=> (dispatch)=>{
  dispatch(authSlice.actions.resetAuthSlice());
}
export const register = (data) => async(dispatch) =>{
  dispatch(authSlice.actions.registerRequest());
  await axios.post("http://localhost:4000/api/v1/auth/register", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=>{
    dispatch(authSlice.actions.registerSuccess(
     res.data
    )).catch(err=>{
      dispatch(authSlice.actions.registerFailed({
        error: err.response.data.message || "Something went wrong",
      }))
    })
  })
};
export const otpVerification = (email, otp) => async(dispatch) =>{
  dispatch(authSlice.actions.otpVerificationRequest());
  await axios.post("http://localhost:4000/api/v1/auth/verify-otp", {email, OTP: otp}, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res=>{
    dispatch(authSlice.actions.otpVerificationSuccess(
     res.data
    ))})
    .catch((err)=>{
      dispatch(authSlice.actions.otpVerificationFailed(
         err.response.data.message || "Something went wrong",))
    })
};

export const login = (data) => async(dispatch) =>{
  dispatch(authSlice.actions.loginRequest());
  await axios.post("http://localhost:4000/api/v1/auth/login", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=>{
    dispatch(authSlice.actions.loginSuccess(
     res.data))
  })
  .catch(err=>{
      dispatch(authSlice.actions.loginFailed(
        err.response.data.message || "Something went wrong",))
    })
};

export const logout = () => async(dispatch) =>{
  dispatch(authSlice.actions.logoutRequest());
  await axios.get("http://localhost:4000/api/v1/auth/logout",  {
    withCredentials: true,
    
  })
  .then((res)=>{
    dispatch(authSlice.actions.logoutSuccess(
     res.data.message));
    dispatch(authSlice.actions.resetAuthSlice());
  })
  .catch(err=>{
      dispatch(authSlice.actions.logoutFailed(
         err.response.data.message || "Something went wrong"))
  });
};

export const getUser = () => async(dispatch) =>{
  dispatch(authSlice.actions.getUserRequest());
  await axios.get("http://localhost:4000/api/v1/auth/me",  {
    withCredentials: true,
    
  })
  .then((res)=>{
    dispatch(authSlice.actions.getUserSuccess(
     res.data));
    
  })
  .catch(err=>{
      dispatch(authSlice.actions.getUserFailed(
         err.response.data.message || "Something went wrong"))
  });
};

export const forgotPassword = (email) => async(dispatch) =>{
  dispatch(authSlice.actions.forgotPasswordRequest());
  await axios.post("http://localhost:4000/api/v1/auth/password/forgot", {email}, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=>{
    dispatch(authSlice.actions.forgotPasswordSuccess(
     res.data.message));
  })
  .catch(err=>{
      dispatch(authSlice.actions.forgotPasswordFailed(
        err.response.data.message || "Something went wrong",))
    })
};

export const resetPassword = (data, token) => async(dispatch) =>{
  dispatch(authSlice.actions.resetPasswordRequest());
  await axios.put(`http://localhost:4000/api/v1/auth/password/reset/${token}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=>{
    dispatch(authSlice.actions.resetPasswordSuccess(
     res.data.message));
  })
  .catch(err=>{
      dispatch(authSlice.actions.resetPasswordFailed(
        err.response.data.message || "Something went wrong",))
    })
};


export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch(authSlice.actions.updatePasswordRequest());

    const res = await axios.put("http://localhost:4000/api/v1/auth/password/update", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    return { success: true, message: res.data.message }; // ✅ important return
  } catch (err) {
    dispatch(authSlice.actions.updatePasswordFailed(
      err.response?.data?.message || "Something went wrong"
    ));
    return { success: false, message: err.response?.data?.message || "Something went wrong" }; // ✅ return error
  }
};

export default authSlice.reducer;