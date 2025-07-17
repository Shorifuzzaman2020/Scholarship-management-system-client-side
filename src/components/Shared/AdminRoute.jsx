import { Navigate, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import axiosSecure from "../../../utils/axiosSecure";
import Loading from "./Loading";

import { useUser } from "../../contexts/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.isAdmin;
    },
  });

  if (loading || isLoading) return <Loading />;

  if (user && isAdmin) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
