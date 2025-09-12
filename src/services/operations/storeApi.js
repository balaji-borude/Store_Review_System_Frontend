import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { StoreEndpoints } from "../apis";
import { setLoading, setStores,setSelectedStore } from "../../slices/storeSlice";

const { GET_ALL_STORE,
  GET_ALL_RATING ,
  CREATE_STORE,
  CREATE_RATING,
    GET_STORE_RATINGS,
    GET_MY_STORE

} = StoreEndpoints;

export function getAllStores(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_STORE, null, // no body for GET
        { Authorization: `Bearer ${token}` });

      console.log("GET ALLSTORES API RESPONSE---------->", response);

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

      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// GET ALL RATING 
export function getAllRatings(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_RATING,{},      {
        Authorization: `Bearer ${token}`,
      });

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
};


//create store 
export function CreateStore(formData,token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", CREATE_STORE,formData,{
        Authorization: `Bearer ${token}`,
      });

      console.log("STORE CREATION API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Store is Created successfully");

      return response.data.data;
    } catch (error) {
      console.log("STORE CREATION API ERROR............", error);
      toast.error("Issue in  Stores creation ");
      return null;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


// create rating 
export const createRatingApi = async (token, { score, userId, storeId }) => {
  try {
    const response = await apiConnector(
      "POST",
      CREATE_RATING,
      { score, userId, storeId },
      { Authorization: `Bearer ${token}` }
    );
    return response.data;
  } catch (error) {
    console.error("CREATE RATING ERROR:", error);
    throw error;
  }
};


// get store rating for partiular storeid 
export function getStoreRatingsApi(storeId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching ratings...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        `${GET_STORE_RATINGS}/${storeId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("GET STORE RATINGS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Fetched ratings successfully");

      // return list of users who rated
      return response.data;
    } catch (error) {
      console.log("GET STORE RATINGS API ERROR............", error);
      toast.error("Failed to fetch ratings");
      return null;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};


//get my stores
export function getMyStores(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching your stores...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_MY_STORE, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET MY STORES API RESPONSE..............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const stores = response.data.stores;

      dispatch(setStores(stores));
      if (stores.length > 0) {
        dispatch(setSelectedStore(stores[0].id)); 
      }

      toast.success("Stores fetched successfully!");
      return stores;
    } catch (error) {
      console.error("GET MY STORES API ERROR:", error);
      
      toast.error("Failed to fetch stores");
      return null;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}




