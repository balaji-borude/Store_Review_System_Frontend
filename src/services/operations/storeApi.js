import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { StoreEndpoints } from "../apis";
import { setLoading, setStores } from "../../slices/storeSlice";

const { GET_ALL_STORE,GET_ALL_RATING } = StoreEndpoints;

export function getAllStores() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_STORE);

      console.log("GET ALLSTORES API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // dispatching to the slice reducer function
      dispatch(setStores(response.data.data));

      toast.success("All store Data is fetched successfully");

      return response.data.data;
    } catch (error) {
      console.log("GET ALL API ERROR............", error);
      toast.error("Issue in Getting All Stores");
      return null;
    } finally {
      // ✅ this always runs, success or error
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getAllRatings() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_RATING,{});

      console.log("GET ALL RATING API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // dispatching to the slice reducer function
      dispatch(setStores(response.data.data));

      toast.success("All Rating fetched successfully");

      return response.data.data;
    } catch (error) {
      console.log("GET ALLRATING  API ERROR............", error);
      toast.error("Issue in Getting All Rating");
      return null;

    } finally {
      
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
