import { NavLink, Outlet } from "react-router-dom";

const ModeratorDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="bg-base-200 p-4 md:w-64">
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/moderator/profile">👤 My Profile</NavLink>
          <NavLink to="/dashboard/moderator/manage-scholarships">🏫 Manage Scholarships</NavLink>
          <NavLink to="/dashboard/moderator/all-reviews">⭐ All Reviews</NavLink>
          <NavLink to="/dashboard/moderator/all-applications">📄 All Applications</NavLink>
          <NavLink to="/dashboard/moderator/add-scholarship">➕ Add Scholarship</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorDashboard;
