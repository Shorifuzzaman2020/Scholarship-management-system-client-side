import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="bg-base-200 p-4 md:w-64">
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/user/profile">👤 My Profile</NavLink>
          <NavLink to="/dashboard/user/my-applications">📄 My Applications</NavLink>
          <NavLink to="/dashboard/user/my-reviews">⭐ My Reviews</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
