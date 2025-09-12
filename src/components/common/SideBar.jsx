// Sidebar.jsx
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearToken, setUser } from "../../slices/authSlice";

// React Icons
import {
  FaStore,
  FaUsers,
  FaSignOutAlt,
  FaTachometerAlt,
  FaEye,
} from "react-icons/fa";
// import "react-pro-sidebar/dist/css/pro-sidebar.css"; // for v1

function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearToken());
    dispatch(setUser(null));
    toast.success("User Logged Out successfully");
    navigate("/");
  };

  return (
    <div className="h-screen">
      <Sidebar
        className="h-full"
        backgroundColor="#1f2937"
        // breakPoint="md"
      >
        <Menu
          menuItemStyles={{
            button: {
              padding: "12px",
              color: "#d1d5db",
              "&:hover": {
                backgroundColor: "#374151",
                color: "#fff",
              },
            },
          }}
        >
          {/* Admin role */}
          {user?.role === "Admin" && (
            <>
              <MenuItem>Admin Dashboard</MenuItem>
              
              <MenuItem
                icon={<FaTachometerAlt />}
                component={<NavLink to="/dashboard/admin/overview" />}
              >
                Admin Overview
              </MenuItem>
              <MenuItem
                icon={<FaStore />}
                component={<NavLink to="/dashboard/admin/stores" />}
              >
                Manage Stores
              </MenuItem>

              <MenuItem
                icon={<FaUsers />}
                component={<NavLink to="/dashboard/admin/users" />}
              >
                Manage Users
              </MenuItem>
            </>
          )}

          {/* User role */}
          {user?.role === "User" && (
            <>
              <MenuItem>User Dashboard</MenuItem>
              <MenuItem
                icon={<FaStore />}
                component={<NavLink to="/dashboard/stores" />}
              >
                View Stores
              </MenuItem>
            </>
          )}

          {/* StoreOwner role */}
          {
          user?.role === "StoreOwner" && (

            <>
            <MenuItem>StoreOwner Dashboard</MenuItem>
              <MenuItem
                icon={<FaEye />}
                component={<NavLink to="/dashboard/allReview" />}
              >
                View All Ratings
              </MenuItem>
            </>
          )
          }

          {/* Common */}
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
