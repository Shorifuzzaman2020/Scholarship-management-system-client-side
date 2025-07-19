

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { data: usersData = {}, refetch, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });

  const users = usersData.users || [];

  const handleRoleChange = async (email, newRole) => {
    try {
      const encodedEmail = encodeURIComponent(email); // 🚨 IMPORTANT
      const res = await fetch(`http://localhost:5000/users/${encodedEmail}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const result = await res.json();

      if (result.modifiedCount > 0) {
        Swal.fire("Success", `User role updated to ${newRole}`, "success");
        refetch();
      } else {
        Swal.fire("Error", "Failed to update role.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this user?",
      text: "This action is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        Swal.fire("Deleted!", "User has been removed.", "success");
        refetch();
      } else {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="text-red-500">Error loading users.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🧑‍💼 Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.displayName}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.email, e.target.value)}
                    className="select select-sm select-bordered"
                  >
                    <option value="user">user</option>
                    <option value="moderator">moderator</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(u._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
