import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user:null,
  loading:false,
  error:null,
  authChecked: false,
}
const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    authStart:(state) => {
      state.loading = true;
      state.error= null
    },
    authSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.authChecked = true;
    },
    authFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.loading = false;
       state.authChecked = true; 
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  }
})

export const {authStart, authSuccess, authFailure, logoutUser} = authSlice.actions;
export default authSlice.reducer;