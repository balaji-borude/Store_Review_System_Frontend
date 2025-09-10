import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,   
  // { id, name, role, token }
  loading:false,
  signupData : null,
  // token la localstorage kadun ghe tahe 
 token: localStorage.getItem("token") || null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     setUser: (state, action) => {
       state.user = action.payload 
      },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); 
    },

    // this is for clear on logout 
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token"); 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
});

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;
export const { setToken, clearToken, setLoading, setSignupData,setUser } = authSlice.actions;
export default authSlice.reducer;
