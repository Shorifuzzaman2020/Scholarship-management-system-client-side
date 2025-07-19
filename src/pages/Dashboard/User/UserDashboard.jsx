

import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-green-600 border-b-2 border-green-600"
      : "text-gray-600 hover:text-green-600";

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="bg-base-200 p-4 md:w-64">
        <nav className="flex flex-col items-center justify-center gap-3">
          <NavLink to="/dashboard/user/profile" className={navLinkClass}>
            👤 My Profile
          </NavLink>
          <NavLink to="/dashboard/user/my-applications" className={navLinkClass}>
            📄 My Applications
          </NavLink>
          <NavLink to="/dashboard/user/my-reviews" className={navLinkClass}>
            ⭐ My Reviews
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
