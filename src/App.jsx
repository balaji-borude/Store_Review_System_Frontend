import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

import AdminDashboard from "./components/core/Dashboard/AdminDashboard";
import StoreOwnerDashboard from "./components/core/Dashboard/StoreOwnerDashboard";

import UserDashboard from "./components/core/Dashboard/UserDashboard";
import DashboardLayout from "./components/core/Dashboard/DashboardLayout";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route
          path="/"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        {/* Private Routes  */}
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

        {/* Dashboard layout  */}
        <Route path="/dashboard" element={<DashboardLayout />}></Route>

        {/* Nested Route for Admin */}


        {/* nested route for user */}



        {/* nested route for store owner */}







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
