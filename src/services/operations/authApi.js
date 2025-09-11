

import { toast } from "react-hot-toast";
import {apiConnector} from '../apiConnector';
import { endpoints } from "../apis";
import { setLoading, setToken,setUser } from "../../slices/authSlice";


const { 
  SIGNUP_API,
  LOGIN_API,
  
} = endpoints 

console.log(SIGNUP_API)

export function signUp(formData,navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));

        try {
            const response = await  apiConnector("POST",SIGNUP_API,formData,{ withCredentials: true,});

            console.log("SIGNUP API RESPONSE............", response)
            
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful");
            navigate("/")

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
};

// login 
export function LoginApi(formData,navigate){
    return async(dispatch)=>{
         const toastId = toast.loading("Loading");
        dispatch(setLoading(true));

        try {
            // api call kr
            const response = await apiConnector("POST",LOGIN_API,formData,{ withCredentials: true,});

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            };

            toast.success("Login Successful");

            // token madhe value takne ane
            dispatch(setToken(response.data.token));
            // localStorage madhe token save kava lagel
          localStorage.setItem("token", response.data.token); 
            localStorage.setItem("user",JSON.stringify(response.data.user));

            // setting user 
            dispatch(setUser(response.data.user));

            // navigation done on  role so --> 
            const role = response.data.user.role; 

            if (role === "Admin") {
                navigate("/dashboard/admin");
            } else if (role === "StoreOwner") {
                navigate("/dashboard/storeowner");
            } else {
                navigate("/dashboard/user");
            }


        } catch (error) {
            console.log("LOGI API ERROR............", error)
            toast.error("Login Failed");
            navigate("/");
        }
        // lastla --> loading la false kr ani toast la dismiss kr 
        dispatch(setLoading(false)); 
        toast.dismiss(toastId);

    }
}