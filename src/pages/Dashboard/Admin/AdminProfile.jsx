const AdminProfile = ({ user }) => {
  return (
    <div className="card shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">👤 Admin Profile</h2>
      <img src={user?.photoURL || "/default-avatar.png"} className="w-24 h-24 rounded-full mx-auto" alt="admin" />
      <div className="mt-4 text-center">
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> Admin</p>
      </div>
    </div>
  );
};

export default AdminProfile;
