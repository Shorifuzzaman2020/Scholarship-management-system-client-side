import { Outlet, NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        {/* Page Content */}
        <Outlet />
      </div>
      <div className="drawer-side bg-base-200">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 space-y-2">
          <li><NavLink to="/dashboard/admin/profile">👤 Admin Profile</NavLink></li>
          <li><NavLink to="/dashboard/admin/add-scholarship">➕ Add Scholarship</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-scholarships">📚 Manage Scholarships</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-applications">📝 Manage Applications</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-users">🧑‍💼 Manage Users</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-reviews">⭐ Manage Reviews</NavLink></li>
          <li><NavLink to="/dashboard/admin/analytics">📊 Analytics</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
