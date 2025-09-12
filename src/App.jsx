import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

import AdminDashboard from "./components/core/Dashboard/AdminDashboard/AdminDashboard";
import StoreOwnerChangePass from "./components/core/Dashboard/StoreOwnerDashboard/StoreOwnerChangePass";

import UserDashboard from "./components/core/Dashboard/UserDashboard/UserDashboard";
import DashboardLayout from "./components/core/Dashboard/DashboardLayout";

// Admin Routes 
import AdminStores from "./components/core/Dashboard/AdminDashboard/AdminStores";
import AdminUsers from "./components/core/Dashboard/AdminDashboard/AdminUsers";

// user Routes 
import UserStores from "./components/core/Dashboard/UserDashboard/UserStores";

// owner routes 
import UserStoreRatings from "./components/core/Dashboard/StoreOwnerDashboard/UserStoreRatings";



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


        {/* Dashboard layout with nested routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >

          {/* Admin */}
          <Route
            path="admin/overview"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/stores"
            element={
              <PrivateRoute role="Admin">
                <AdminStores />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/users"
            element={
              <PrivateRoute role="Admin">
                <AdminUsers />
              </PrivateRoute>
            }
          />

          {/* User */}
          {/* <Route
            path="user"
            element={
              <PrivateRoute role="User">
                <UserDashboard />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="stores"
            element={
              <PrivateRoute role="User">
                <UserStores />
              </PrivateRoute>
            }
          />

          {/* Store Owner */}
          <Route
            path="changepassword"
            element={
              <PrivateRoute role="StoreOwner">
                <StoreOwnerChangePass />
              </PrivateRoute>
            }
          />
          <Route
            path="allRating"
            element={
              <PrivateRoute role="StoreOwner">
                <UserStoreRatings />
              </PrivateRoute>
            }
          />
            
        </Route>

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
