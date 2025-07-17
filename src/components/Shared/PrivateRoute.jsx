
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/AuthProvider";



const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
