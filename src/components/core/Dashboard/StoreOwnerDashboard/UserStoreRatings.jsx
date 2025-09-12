// components/UserStoreRatings.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreRatingsApi } from "../../../../services/operations/storeApi";
import { FaUserCircle } from "react-icons/fa";

const UserStoreRatings = ({ storeId }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [ratings, setRatings] = useState([]);

   useEffect(() => {
    const fetchRatings = async () => {
      const res = await dispatch(getStoreRatingsApi(storeId, token));
      if (res) {
        setRatings(res);
      }
    };
    fetchRatings();
  }, [dispatch, storeId, token]);

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
                    {rating.userId?.email}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-yellow-600">
                ⭐ {rating.score}/5
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
