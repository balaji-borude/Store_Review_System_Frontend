import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  // user is logged in then ---> redirect based on Their role
  if (token && user) {
    if (user.role === "Admin") return <Navigate to="/dashboard/admin" replace />;
    if (user.role === "StoreOwner") return <Navigate to="/dashboard/storeowner" replace />;
    return <Navigate to="/dashboard/user" replace />;
  }

  return children; // user not logged in, show public page
};

export default OpenRoute;


