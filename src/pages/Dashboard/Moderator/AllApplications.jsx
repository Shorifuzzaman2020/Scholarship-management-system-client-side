import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import { useState, useEffect } from "react";

// NEW STATE
const [statusFilter, setStatusFilter] = useState("All");
const [sortOrder, setSortOrder] = useState("Newest");
const [filteredApps, setFilteredApps] = useState([]);

const AllApplications = () => {
    const [selectedApp, setSelectedApp] = useState(null);

    const { data: applications = [], refetch } = useQuery({
        queryKey: ["all-applications"],
        queryFn: async () => {
            const res = await fetch("https://your-server.com/applications");
            return res.json();
        },
    });
    useEffect(() => {
        let updated = [...applications];

        // 🧹 Apply status filter
        if (statusFilter !== "All") {
            updated = updated.filter((app) => app.status === statusFilter);
        }

        // 🧭 Sort by application date
        updated.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "Newest"
                ? dateB - dateA
                : dateA - dateB;
        });

        setFilteredApps(updated);
    }, [applications, statusFilter, sortOrder]);

    const handleStatusUpdate = async (id, newStatus) => {
        const res = await fetch(`https://your-server.com/applications/status/${id}`, {
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

        const res = await fetch(`https://your-server.com/applications/feedback/${id}`, {
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

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">📄 All Applications</h2>
            <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                {/* 🔽 Status Filter */}
                <select
                    className="select select-bordered"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Rejected</option>
                </select>

                {/* 📅 Sort Option */}
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
                        {filteredApps.map((app) => (
                            <tr key={app._id}>
                                <td>{app.universityName}</td>
                                <td>{app.appliedDegree}</td>
                                <td>{app.subjectCategory}</td>
                                <td>
                                    <span className={`badge ${app.status === "Pending"
                                        ? "badge-warning"
                                        : app.status === "Processing"
                                            ? "badge-info"
                                            : app.status === "Completed"
                                                ? "badge-success"
                                                : "badge-error"
                                        }`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="flex flex-wrap gap-2">
                                    <button className="btn btn-xs btn-info" onClick={() => {
                                        setSelectedApp(app);
                                        document.getElementById("detailsModal").showModal();
                                    }}>
                                        Details
                                    </button>

                                    <button className="btn btn-xs btn-secondary" onClick={() => {
                                        setSelectedApp(app);
                                        document.getElementById("feedbackModal").showModal();
                                    }}>
                                        Feedback
                                    </button>

                                    <button className="btn btn-xs btn-error" onClick={() => handleCancel(app._id)}>
                                        Cancel
                                    </button>

                                    {/* Toggle status */}
                                    {app.status === "Pending" && (
                                        <button className="btn btn-xs btn-outline" onClick={() => handleStatusUpdate(app._id, "Processing")}>
                                            Mark Processing
                                        </button>
                                    )}
                                    {app.status === "Processing" && (
                                        <button className="btn btn-xs btn-outline btn-success" onClick={() => handleStatusUpdate(app._id, "Completed")}>
                                            Mark Completed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🧾 Details Modal */}
            <dialog id="detailsModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Application Details</h3>
                    {selectedApp && (
                        <div className="mt-4">
                            <p><strong>University:</strong> {selectedApp.universityName}</p>
                            <p><strong>Degree:</strong> {selectedApp.appliedDegree}</p>
                            <p><strong>Scholarship:</strong> {selectedApp.scholarshipCategory}</p>
                            <p><strong>Fees:</strong> ${selectedApp.applicationFees}</p>
                            <p><strong>Service Charge:</strong> ${selectedApp.serviceCharge}</p>
                            <p><strong>User:</strong> {selectedApp.userName} ({selectedApp.userEmail})</p>
                            <p><strong>Date:</strong> {selectedApp.date}</p>
                        </div>
                    )}
                    <div className="modal-action">
                        <button className="btn" onClick={() => document.getElementById("detailsModal").close()}>Close</button>
                    </div>
                </div>
            </dialog>

            {/* 📝 Feedback Modal */}
            <dialog id="feedbackModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Submit Feedback</h3>
                    <form onSubmit={handleFeedbackSubmit} className="mt-4">
                        <textarea name="feedback" placeholder="Enter feedback here..." className="textarea textarea-bordered w-full" required></textarea>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn" onClick={() => document.getElementById("feedbackModal").close()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AllApplications;
