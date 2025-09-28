import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OpenRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
   
    return <Navigate to="/dashboard" replace />;
  }

  // no token → allow access
  return children;
};

export default OpenRoute;


