

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const AllApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [filteredApps, setFilteredApps] = useState([]);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/applications");
      return res.json();
    },
  });

  useEffect(() => {
    let updated = [...applications];

    if (statusFilter !== "All") {
      updated = updated.filter((app) => app.status?.toLowerCase() === statusFilter.toLowerCase());
    }

    updated.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredApps(updated);
  }, [applications, statusFilter, sortOrder]);

  const handleStatusUpdate = async (id, newStatus) => {
    const res = await fetch(`http://localhost:5000/applications/status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (data.modifiedCount > 0) {
      Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");
      refetch();
    }
  };

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Application?",
      text: "This will mark it as Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (confirm.isConfirmed) {
      handleStatusUpdate(id, "Rejected");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    const id = selectedApp?._id;

    const res = await fetch(`http://localhost:5000/applications/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
      Swal.fire("Sent!", "Feedback submitted.", "success");
      refetch();
      document.getElementById("feedbackModal").close();
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "badge-warning";
    if (s === "processing") return "badge-info";
    if (s === "completed" || s === "approved") return "badge-success";
    return "badge-error";
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📄 All Applications</h2>
      <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>University</th>
              <th>Degree</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => {
              const status = app.status?.toLowerCase();
              return (
                <tr key={app._id}>
                  <td>{app.universityName}</td>
                  <td>{app.degree}</td>
                  <td>{app.subjectCategory}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(status)}`}>
                      {capitalize(status)}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => {
                        setSelectedApp(app);
                        document.getElementById("detailsModal").showModal();
                      }}
                    >
                      Details
                    </button>

                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => {
                        setSelectedApp(app);
                        document.getElementById("feedbackModal").showModal();
                      }}
                    >
                      Feedback
                    </button>

                    {status === "pending" && (
                      <>
                        <button
                          className="btn btn-xs btn-outline btn-success"
                          onClick={() => handleStatusUpdate(app._id, "Processing")}
                        >
                          Processing
                        </button>

                      </>
                    )}

                    {status === "processing" && (
                      <>
                        <button
                          className="btn btn-xs btn-outline btn-success"
                          onClick={() => handleStatusUpdate(app._id, "Completed")}
                        >
                          Completed
                        </button>
                        <button
                          className="btn btn-xs btn-outline btn-error"
                          onClick={() => handleStatusUpdate(app._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>

                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <dialog id="detailsModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Application Details</h3>
          {selectedApp && (
            <div className="mt-4 space-y-2">
              <p><strong>University:</strong> {selectedApp.universityName}</p>
              <p><strong>Degree:</strong> {selectedApp.degree}</p>
              <p><strong>Scholarship:</strong> {selectedApp.scholarshipCategory}</p>
              <p><strong>SSC Result:</strong> {selectedApp.sscResult}</p>
              <p><strong>HSC Result:</strong> {selectedApp.hscResult}</p>
              <p><strong>Study Gap:</strong> {selectedApp.studyGap}</p>
              <p><strong>Apply Date:</strong> {selectedApp.applyDate}</p>

            </div>
          )}
          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById("detailsModal").close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Feedback Modal */}
      <dialog id="feedbackModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submit Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="mt-4">
            <textarea
              name="feedback"
              placeholder="Enter feedback here..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn" onClick={() => document.getElementById("feedbackModal").close()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AllApplications;
