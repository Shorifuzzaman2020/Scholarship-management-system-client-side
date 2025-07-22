

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useUser } from "../../../contexts/AuthProvider";
import { useEffect, useState } from "react";
import axiosSecure from "../../../../utils/axiosSecure";
import axios from "axios";

const MyApplications = () => {
  const { user } = useUser();
  const [selectedScholarshipId, setSelectedScholarshipId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);  // Store the selected scholarship details

  const [editApplication, setEditApplication] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get(`https://scholarship-server-liard.vercel.app/scholarships`);
        setScholarships(res.data);
      } catch (error) {
        console.error("Failed to fetch scholarships:", error);
      }
    };

    fetchScholarships();
  }, []);

  const { data: apps = [], refetch } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user?.email}`);
      return res.data;
    }
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this application?",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      icon: "warning",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/applications/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Your application was cancelled.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to cancel application", "error");
      }
    }
  };

  const openReviewModal = (app) => {
    const matchedScholarship = scholarships.find(
      (s) => s._id === app.scholarshipId
    );

    if (matchedScholarship) {
      setSelectedScholarshipId(matchedScholarship._id);
    } else {
      setSelectedScholarshipId(null);
    }

    setReviewText("");
    document.getElementById("review_modal").showModal();
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      Swal.fire("Empty Review", "Please write something before submitting.", "warning");
      return;
    }

    if (!selectedScholarshipId) {
      Swal.fire("Error", "Scholarship not found for this application.", "error");
      return;
    }

    try {
      const reviewData = {
        scholarshipId: selectedScholarshipId,
        userEmail: user?.email,
        reviewerImage: user?.photoURL,
        reviewerName: user?.displayName,
        reviewText: reviewText,
        reviewDate: new Date().toISOString()
      };

      const res = await axiosSecure.post('/reviews', reviewData);

      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted successfully.", "success");
        refetch();
        document.getElementById("review_modal").close();
      } else {
        Swal.fire("Error", "Failed to submit review", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  const openEditModal = (app) => {
    setEditApplication(app);
    setEditedFields({
      universityName: app.universityName,
      subjectCategory: app.subjectCategory,
      degree: app.degree,
      applicationFees: app.applicationFees
    });
    document.getElementById("edit_modal").showModal();
  };

  const handleEditSubmit = async () => {
    if (!editApplication) return;

    try {
      const res = await fetch(`https://scholarship-server-liard.vercel.app/applications/${editApplication._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedFields),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        Swal.fire("Success", "Application updated successfully.", "success");
        document.getElementById("edit_modal").close();
        refetch();
      } else {
        Swal.fire("No Changes", "No changes were made.", "info");
      }

    } catch (error) {
      Swal.fire("Error", "Failed to update application.", "error");
    }
  };

  // Handle opening the details modal
  const openDetailsModal = (app) => {
    // Find the scholarship details using the scholarshipId
    const matchedScholarship = scholarships.find(
      (s) => s._id === app.scholarshipId
    );

    // If scholarship details exist, set them in state
    if (matchedScholarship) {
      setSelectedScholarship(matchedScholarship);
      document.getElementById("details_modal").showModal();
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
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => handleCancel(app._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => openReviewModal(app)}
                  >
                    Review
                  </button>
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => {
                      if (app.status === "pending") {
                        window.location.href = `edit-application/${app._id}`;
                      } else {
                        Swal.fire("Not Allowed", "You can edit only pending applications.", "info");
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => openDetailsModal(app)}  // Open Details Modal
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Write a Review</h3>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with this scholarship..."
          />
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-outline">Cancel</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReviewSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Application</h3>

          <input
            type="text"
            className="input input-bordered w-full mb-2"
            value={editedFields.universityName || ""}
            onChange={(e) => setEditedFields({ ...editedFields, universityName: e.target.value })}
            placeholder="University Name"
          />

          <input
            type="text"
            className="input input-bordered w-full mb-2"
            value={editedFields.subjectCategory || ""}
            onChange={(e) => setEditedFields({ ...editedFields, subjectCategory: e.target.value })}
            placeholder="Subject Category"
          />

          <input
            type="text"
            className="input input-bordered w-full mb-2"
            value={editedFields.degree || ""}
            onChange={(e) => setEditedFields({ ...editedFields, degree: e.target.value })}
            placeholder="Degree"
          />

          <input
            type="number"
            className="input input-bordered w-full mb-4"
            value={editedFields.applicationFees || ""}
            onChange={(e) => setEditedFields({ ...editedFields, applicationFees: parseFloat(e.target.value) })}
            placeholder="Application Fees"
          />

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-outline">Cancel</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Scholarship Details</h3>
          {selectedScholarship ? (
            <div>
              <p><strong>University:</strong> {selectedScholarship.universityName}</p>
              <p><strong>Subject:</strong> {selectedScholarship.subjectCategory}</p>
              <p><strong>Degree:</strong> {selectedScholarship.degree}</p>
              <p><strong>Application Fees:</strong> ${selectedScholarship.applicationFees}</p>
              <p><strong>Scholarship Category:</strong> {selectedScholarship.scholarshipCategory}</p>
              <p><strong>Department:</strong> {selectedScholarship.subjectCategory}</p>
              <p><strong>Description:</strong> {selectedScholarship.description || "No description available."}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("details_modal").close()} // Close modal when clicked
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
};

export default MyApplications;
