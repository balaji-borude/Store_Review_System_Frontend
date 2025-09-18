//const  BASE_URL=http://localhost:3000/api/v1;
// GET IT FROM .ENV FILE 

const  BASE_URL=import.meta.env.VITE_BASE_URL;
console.log("Printing the base url from frontend ===>",BASE_URL);


// http://localhost:3000/api/v1/auth/signup
export const endpoints={
    SIGNUP_API: BASE_URL+"/auth/signup",
    LOGIN_API: BASE_URL+"/auth/login",
    CHANGE_PASSWORD:BASE_URL+"/auth/changePassword"
};

export const StoreEndpoints={
    GET_ALL_STORE:BASE_URL+"/store/getAllStores",
    CREATE_STORE:BASE_URL+"/store/createStore",
    GET_MY_STORE:BASE_URL+"/store/getMyStores",

    // Get rating here 
    GET_ALL_RATING:BASE_URL+"/rating/getAllRatings",
    //create rating 
    CREATE_RATING:BASE_URL+"/rating/createRating",

    GET_STORE_RATINGS:BASE_URL+"/rating/getStoreRatings"
};


export const userEndpoints ={
    GET_ALL_USERS:BASE_URL+"/auth/getAllUser"
}