// DashboardLayout.jsx
import SideBar from "../../common/SideBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* ite return the  */}
        <Outlet />
      </main>
    </div>
  );
}
