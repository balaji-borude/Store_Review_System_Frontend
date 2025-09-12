import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStores, getStoreRatingsApi } from "../../../../services/operations/storeApi";
import { FaUserCircle } from "react-icons/fa";

const UserStoreRatings = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const {  selectedStoreId } = useSelector((state) => state.store);
  const [ratings, setRatings] = useState([]);

  // Fetch owner's all stores here to get the owner Id 
  useEffect(() => {
    if (token) {
     const res = dispatch(getMyStores(token));
     console.log("printing the response of get my stores  -->",res )
    }
  }, [dispatch, token]);

  // Fetch ratings whenever selectedStoreId changes
  useEffect(() => {
    if (!selectedStoreId) return;

    const fetchRatings = async () => {
      const res = await dispatch(getStoreRatingsApi(selectedStoreId, token));
      if (res) {
        setRatings(res);
      }
    };

    fetchRatings();
  }, [dispatch, selectedStoreId, token]);

  return (
    <div className="mt-6 bg-gray-50 border rounded-xl p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">
        Users who rated this store
      </h2>

      {ratings.length > 0 ? (
        <ul className="space-y-3">
          {ratings.map((rating) => (
            <li
              key={rating._id}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-x-3">
                <FaUserCircle className="text-gray-600" size={28} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {rating.userId?.name || "Anonymous"}
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
