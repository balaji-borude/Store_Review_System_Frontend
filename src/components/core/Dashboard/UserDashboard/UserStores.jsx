import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStores,
  createRatingApi,
} from "../../../../services/operations/storeApi";
import { toast } from "react-hot-toast";
import { FaStore, FaStar, FaRegStar } from "react-icons/fa";

// Custom Star Rating Component
const StarRating = ({ value, count = 5, size = 24, editable = false, onChange, activeColor = "#facc15" }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating) => {
    if (editable && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (editable) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverValue(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverValue || value) >= starValue;
        
        return (
          <button
            key={index}
            type="button"
            className={`${editable ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={!editable}
          >
            {isFilled ? (
              <FaStar 
                size={size} 
                style={{ color: activeColor }} 
              />
            ) : (
              <FaRegStar 
                size={size} 
                style={{ color: '#d1d5db' }} 
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const UserStores = () => {
  const [storedata, setStoreData] = useState([]);
  const [userRatings, setUserRatings] = useState({}); // track local ratings
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  // Fetch stores
  useEffect(() => {
    const getAllStoresData = async () => {
      const response = await dispatch(getAllStores(token));
      if (response) {
        setStoreData(response);
      }
    };
    getAllStoresData();
  }, [dispatch, token]);

  // Handle rating
  const handleRating = async (score, storeId) => {
    try {
      const payload = { score, userId: user.id, storeId };
      const res = await createRatingApi(token, payload);

      if (res.success) {
        toast.success("Thanks for rating this store!");
        setUserRatings((prev) => ({ ...prev, [storeId]: score }));

        // refresh avg ratings
        const refreshedStores = await dispatch(getAllStores(token));
        setStoreData(refreshedStores);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error while rating store");
      console.error(error);
    }
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-x-3">
        <FaStore className="text-orange-500" size={30} />
        <span>All Stores</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {storedata.length > 0 ? (
          storedata.map((store) => (
            <div
              key={store.id}
              className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {store.name}
              </h2>
              <p className="text-gray-600 mt-1">{store.address}</p>

              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium">Store ID:</span>{" "}
                <span className="font-mono">{store.id}</span>
              </p>

              {/* Average Rating */}
              <div className="mt-4">
                <p className="font-medium text-gray-800 mb-2">Average Rating</p>
                <div className="flex items-center gap-x-3">
                  <StarRating
                    value={store.avgRating || 0}
                    size={24}
                    editable={false}
                    activeColor="#facc15"
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    {store.avgRating?.toFixed(1) || 0} / 5
                  </span>
                </div>
              </div>

              {/* User Rating */}
              <div className="mt-4">
                <p className="font-medium text-gray-800 mb-2">Rate this store:</p>
                <div className="flex items-center gap-x-3">
                  <StarRating
                    value={userRatings[store.id] || 0}
                    size={28}
                    editable={true}
                    activeColor="#f97316"
                    onChange={(score) => handleRating(score, store.id)}
                  />
                  {userRatings[store.id] && (
                    <span className="text-xs text-green-600 font-medium">
                      You rated: {userRatings[store.id]} ⭐
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No Stores Available
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStores;