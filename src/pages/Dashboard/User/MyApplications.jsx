import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useContext(AuthContext);

  const { data: apps = [], refetch } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await fetch(`https://your-server.com/applications/user/${user?.email}`);
      return res.json();
    }
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this application?",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel"
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`https://your-server.com/applications/${id}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        Swal.fire("Cancelled!", "Your application was cancelled.", "success");
        refetch();
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📄 My Scholarship Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>University</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app._id}>
                <td>{app.universityName}</td>
                <td>{app.subjectCategory}</td>
                <td>{app.degree}</td>
                <td>${app.applicationFees}</td>
                <td className="capitalize">{app.status}</td>
                <td>{app.feedback || "—"}</td>
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-outline" onClick={() => handleCancel(app._id)}>Cancel</button>
                  <button className="btn btn-xs btn-primary">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
