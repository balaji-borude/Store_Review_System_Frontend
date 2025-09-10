import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user"),
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  loading: false,
  signupData: null,
  // { id, name, role, token }
  // token la localstorage kadun ghe tahe
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setToken(state, actions) {
      state.token = actions.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
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
export const { setToken, clearToken, setLoading, setSignupData, setUser } =
  authSlice.actions;
export default authSlice.reducer;
