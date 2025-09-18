import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStores, getStoreRatingsApi } from "../../../../services/operations/storeApi";
import { FaUserCircle } from "react-icons/fa";

const UserStoreRatings = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [ratings, setRatings] = useState([]);

  // useEffect(() => {
  //   const fetchStoresAndRatings = async () => {
  //     // 1️⃣ Get all stores
  //     const storeRes = await dispatch(getMyStores(token));

  //     console.log("Stores response:", storeRes);

  //     if (storeRes && storeRes.length > 0) {
  //       // 2️⃣ Extract store IDs
  //       const storeIds = storeRes.map(store => store._id);

  //       // 3️⃣ Loop through store IDs and fetch ratings
  //       let allRatings = [];
  //       for (const id of storeIds) {
  //         const ratingRes = await dispatch(getStoreRatingsApi(id, token));
  //         if (ratingRes && ratingRes.length > 0) {
  //           allRatings = [...allRatings, ...ratingRes];
  //         }
  //       }

  //       // 4️⃣ Save ratings in state
  //       setRatings(allRatings);
  //     }
  //   };

  //   fetchStoresAndRatings();
  // }, [dispatch, token]);

useEffect(() => {
  const fetchStoresAndRatings = async () => {
    const storeRes = await dispatch(getMyStores(token));

    console.log("get all store id ==>",storeRes);

    if (storeRes.length > 0) {
      console.log("inside if block ")
      // Extract numeric IDs directly
      const storeIds = storeRes.map(store => store.id);
      console.log("Store IDs:", storeIds); // this return the array of store id broo 

      // Pass all IDs to the API
      const ratingsRes = await dispatch(getStoreRatingsApi(storeIds[0], token));

      console.log("print rating res ==>",ratingsRes.data)

      if (ratingsRes) {
        setRatings(ratingsRes.data);
      }
    }
  };

  fetchStoresAndRatings();
}, [dispatch, token]);

  return (
    <div className="mt-6 bg-gray-50 border rounded-xl p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">
        Users who rated your stores
      </h2>

      {ratings.length > 0 ? (
        <ul className="space-y-3">
          {ratings.map((rating,index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-x-3">
                <FaUserCircle className="text-gray-600" size={28} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {rating.user?.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {rating.userId?.email || ""}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-yellow-600">
                {rating.score}/5
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No ratings yet</p>
      )}
    </div>
  );
};

export default UserStoreRatings;
