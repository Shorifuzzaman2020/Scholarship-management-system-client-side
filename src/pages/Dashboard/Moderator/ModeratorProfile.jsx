import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const ModeratorProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <img src={user?.photoURL || "/default-avatar.png"} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-bold text-center">{user?.displayName}</h2>
      <p className="text-center text-gray-600">{user?.email}</p>
      <p className="text-center mt-2 text-blue-500">Role: Moderator</p>
    </div>
  );
};

export default ModeratorProfile;
