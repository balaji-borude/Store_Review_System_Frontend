import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({role,children}) => {

  const { user, token } = useSelector((state) => state.auth);

  
  // console.log("Printign the token form private route==>",token);

  // / path la --> login takll aeh 
  if (!token) {
  return <Navigate to="/" replace />;
}

if (role && user?.role !== role) {
  return <Navigate to="/" replace />;
}

  return children;  // if user is authorized then --> render components
}

export default PrivateRoute
