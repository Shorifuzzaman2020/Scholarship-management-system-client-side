

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../contexts/AuthProvider";

const UserProfile = () => {
  const { user: authUser } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const res = await axios.get(`http://localhost:5000/users/${authUser?.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    if (authUser?.email) {
      fetchUser();
    }
  }, [authUser]);

  if (loading) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <img
        src={user?.photoURL || "/default-avatar.png"}
        className="w-24 h-24 rounded-full mx-auto mb-4"
        alt="user"
      />
      <h2 className="text-xl font-bold text-center">
        Name: {user?.displayName}
      </h2>
      <p className="text-center text-gray-600">Email: {user?.email}</p>
    </div>
  );
};

export default UserProfile;
