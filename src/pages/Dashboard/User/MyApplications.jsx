

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useUser } from "../../../contexts/AuthProvider";
import { useState } from "react";
import axiosSecure from "../../../../utils/axiosSecure";

const MyApplications = () => {
  const { user } = useUser();
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [reviewText, setReviewText] = useState("");

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

  const openReviewModal = (id) => {
    setSelectedAppId(id);
    setReviewText("");
    document.getElementById("review_modal").showModal();
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      Swal.fire("Empty Review", "Please write something before submitting.", "warning");
      return;
    }

    try {
      const reviewData = {
        scholarshipId: selectedAppId.toString(),
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
                    onClick={() => openReviewModal(app._id)}
                  >
                    Review
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
    </div>
  );
};

export default MyApplications;
