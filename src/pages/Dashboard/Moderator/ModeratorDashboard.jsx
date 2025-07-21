
import { NavLink, Outlet } from "react-router-dom";

const ModeratorDashboard = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-green-600 border-b-2 border-green-600"
      : "text-gray-600 hover:text-green-600";

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="bg-base-200 p-4 md:w-64">
        <nav className="flex flex-col gap-3 items-start justify-center">
          <NavLink to="/dashboard/moderator/profile" className={navLinkClass}>
            👤 My Profile
          </NavLink>
          <NavLink to="/dashboard/moderator/manage-scholarships" className={navLinkClass}>
            🏫 Manage Scholarships
          </NavLink>
          <NavLink to="/dashboard/moderator/all-reviews" className={navLinkClass}>
            ⭐ All Reviews
          </NavLink>
          <NavLink to="/dashboard/moderator/all-applications" className={navLinkClass}>
            📄 All Applications
          </NavLink>
          <NavLink to="/dashboard/moderator/add-scholarship" className={navLinkClass}>
            ➕ Add Scholarship
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorDashboard;
