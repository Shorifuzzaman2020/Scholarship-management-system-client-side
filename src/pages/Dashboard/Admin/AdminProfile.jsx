
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../contexts/AuthProvider";


const AdminProfile = () => {
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
    <div className="card shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">👤 Admin Profile</h2>
      <img
        src={user?.photoURL || "/default-avatar.png"}
        className="w-24 h-24 rounded-full mx-auto"
        alt="admin"
      />
      <div className="mt-4 text-center">
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> Admin</p>
      </div>
    </div>
  );
};

export default AdminProfile;
