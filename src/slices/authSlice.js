import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: localStorage.getItem("user"),
//     token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
//   loading: false,
//   signupData: null,
//   // { id, name, role, token }
//   // token la localstorage kadun ghe tahe
// };
const initialState = {
  user: localStorage.getItem("user") 
          ? JSON.parse(localStorage.getItem("user")) 
          : null,
  token: localStorage.getItem("token") 
          ? localStorage.getItem("token")   // keep as string (JWT)
          : null,
  loading: false,
  signupData: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);  // no stringify needed
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
});


export const { setToken, clearToken, setLoading, setSignupData, setUser } =
  authSlice.actions;
export default authSlice.reducer;
