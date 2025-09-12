import React, { useState, useEffect } from "react";

import {
  getAllStores,
  getAllRatings,
} from "../../../../services/operations/storeApi";
import { getAllUser } from "../../../../services/operations/authApi";

// card icons
import { FaUsers } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const AdminDashboard = () => {
  // caling token
  // const token = useSelector((state) => state.auth.token);

  const [userCount, setUserCount] = useState(0);
  const [storeCount, setStoreCount] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);

  useEffect(() => {
    const fetchStores = async () => {
      const stores = await dispatch(getAllStores());
      if (stores) {
        setStoreCount(stores.length);
      }
    };
    // getting all the store count
    const totalrating = async () => {
      const rating = await dispatch(getAllRatings(token));
      // console.log("printing rating -->", rating);
      if (rating) {
        setTotalRating(rating.length);
      }
    };

    const totaluser=async()=>{

      const res = await dispatch(getAllUser());
      if (res && res.count !== undefined) {
        setUserCount(res.count);
      }
    }
    // API CALLING
    fetchStores();
    totaluser()
    totalrating();
  },[] );



 
  // card data
  const cardData = [
    {
      title: "Total Users",
      value: userCount ,
      icon: <FaUsers className="text-blue-500 text-3xl" />,
    },
    {
      title: "Total Stores",
      value: storeCount ,
      icon: <FaStore className="text-green-500 text-3xl" />,
    },
    {
      title: "Total Ratings",
      value: totalRating ,
      icon: <FaStar className="text-yellow-500 text-3xl" />,
    },
  ];
  
  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6 text-center ">Admin Dashboard Overview </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <div>
              <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className="bg-gray-100 rounded-full p-3">{card.icon}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
