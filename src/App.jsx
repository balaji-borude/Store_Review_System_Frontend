import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./components/core/Dashboard/AdminDashboard";
import StoreOwnerDashboard from "./components/core/Dashboard/StoreOwnerDashboard";

import UserDashboard from "./components/core/Dashboard/UserDashboard";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute role="Admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/user"
          element={
            <PrivateRoute role="User">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/storeowner"
          element={
            <PrivateRoute role="StoreOwner">
              <StoreOwnerDashboard />
            </PrivateRoute>
          }
        />

        {/* Not Found  */}
        <Route
          path="*"
          element={
            <div className="text-4xl font-semibold text-center mt-20">
              404 <br /> Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
