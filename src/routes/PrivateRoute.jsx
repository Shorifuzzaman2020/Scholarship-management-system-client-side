import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (user) return children;
  return <Navigate to="/login" />;
  
};

export default PrivateRoute;
