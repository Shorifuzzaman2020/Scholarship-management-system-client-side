import { Navigate, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";


import axiosSecure from "../../../utils/axiosSecure";
import Loading from "./Loading";

import { useUser } from "../../contexts/AuthProvider";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  const { data: isModerator, isLoading } = useQuery({
    queryKey: ["moderator", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user.email}`);
      return res.data?.isModerator;
    },
  });

  if (loading || isLoading) return <Loading />;

  if (user && isModerator) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ModeratorRoute;
