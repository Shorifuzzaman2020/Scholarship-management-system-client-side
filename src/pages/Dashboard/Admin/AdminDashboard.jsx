

import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-green-600 border-b-2 border-green-600"
      : "text-gray-600 hover:text-green-600";

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="bg-base-200 p-4 md:w-64">
        <nav className="flex flex-col gap-3 items-start justify-center">
          <NavLink to="/dashboard/admin/profile" className={navLinkClass}>
            👤 Admin Profile
          </NavLink>
          <NavLink to="/dashboard/admin/add-scholarship" className={navLinkClass}>
            ➕ Add Scholarship
          </NavLink>
          <NavLink to="/dashboard/admin/manage-scholarships" className={navLinkClass}>
            📚 Manage Scholarships
          </NavLink>
          <NavLink to="/dashboard/admin/manage-applications" className={navLinkClass}>
            📝 Manage Applications
          </NavLink>
          <NavLink to="/dashboard/admin/manage-users" className={navLinkClass}>
            🧑‍💼 Manage Users
          </NavLink>
          <NavLink to="/dashboard/admin/manage-reviews" className={navLinkClass}>
            ⭐ Manage Reviews
          </NavLink>
          <NavLink to="/dashboard/admin/analytics" className={navLinkClass}>
            📊 Analytics
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
