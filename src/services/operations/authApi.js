import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints, userEndpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../slices/authSlice";

const { SIGNUP_API, LOGIN_API, CHANGE_PASSWORD } = endpoints;

const { GET_ALL_USERS } = userEndpoints;

// console.log(SIGNUP_API)

export function signUp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, formData, {
        withCredentials: true,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// login
export function LoginApi(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      // api call kr
      const response = await apiConnector("POST", LOGIN_API, formData, {
        withCredentials: true,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      // token madhe value takne ane
      dispatch(setToken(response.data.token));
      // localStorage madhe token save kava lagel
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // setting user
      dispatch(setUser(response.data.user));

      // navigation done on  role so -->
      const role = await response.data.user.role;
      console.log("Role of current login user -=====> ".role);

      if (role === "Admin") {
        navigate("dashboard/admin/overview");
      } else if (role === "StoreOwner") {
        navigate("/dashboard/allRating");
      } else {
        navigate("/dashboard/stores");
      }
    } catch (error) {
      console.log("LOGI API ERROR............", error);
      toast.error("Login Failed");
      navigate("/");
    }
    // lastla --> loading la false kr ani toast la dismiss kr
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Get all user
export function getAllUser() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_USERS, {});

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      //   dispatch(setUser(response.data.data)); --> this line is culprit
      console.log("response of Get all users ==>", response.data);
      return response.data; // ✅ return data, no navigate
    } catch (error) {
      console.error("GET ALL USERS API ERROR", error);
      return null;
    } finally {
      // ✅ this always runs, success or error
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// signup by admin
export function signUpByAdmin(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, formData, {
        withCredentials: true,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
    }finally
    {

      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// change password
// services/operations/authApi.js

// In authApi.js
export const changePasswordApi = (passwordData, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
   
    try {
      const response = await apiConnector(
        "PUT",
        CHANGE_PASSWORD,
        passwordData,
        { Authorization: `Bearer ${token}` }
      );

      console.log("CHANGE PASSWORD  API RESPONSE............", response);
            if (!response.data.success) {
        throw new Error(response.data.message);
      }
       toast.success("Password change  Successfuly");

      return response;
    } catch (error) {
      console.log("CHANGE PASSWORD API ERROR............", error);
      toast.error("Can not able to change Password  ");
    }finally{

      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
