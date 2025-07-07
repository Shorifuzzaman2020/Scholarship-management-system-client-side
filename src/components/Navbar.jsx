import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await logOut();
  };

  const navItems = (
    <>
      <NavLink to="/" className="btn btn-ghost">Home</NavLink>
      <NavLink to="/scholarships" className="btn btn-ghost">All Scholarship</NavLink>
      {user && <NavLink to="/dashboard" className="btn btn-ghost">Dashboard</NavLink>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">ScholarWise</Link>
      </div>
      <div className="flex-none gap-4">
        {navItems}
        {
          user ?
            <>
              <img src={user?.photoURL} className="w-8 h-8 rounded-full" />
              <button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button>
            </>
            :
            <NavLink to="/login" className="btn btn-outline btn-sm">Login</NavLink>
        }
      </div>
    </div>
  );
};

export default Navbar;
