
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../contexts/AuthProvider";

const MyReviews = () => {
  const { user } = useUser();
  const [editReview, setEditReview] = useState(null);
  const [scholarships, setScholarships] = useState([]);

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

  const { data: reviews = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["user-reviews", user?.email],
    queryFn: async () => {
      const res = await fetch(`https://scholarship-server-liard.vercel.app/reviews/user/${user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const getScholarshipDetails = (scholarshipId) => {
    const match = scholarships.find(s => s.scholarshipId === scholarshipId || s._id?.toString() === scholarshipId?.toString());
    return match ? { name: match.scholarshipName, university: match.universityName } : { name: "Unknown Scholarship", university: "Unknown University" };
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`https://scholarship-server-liard.vercel.app/reviews/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (result.deletedCount > 0) {
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        refetch();
      } else {
        Swal.fire("Error!", "Failed to delete review.", "error");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedReview = {
      reviewText: form.reviewText.value,
      rating: form.rating.value,
    };

    const res = await fetch(`https://scholarship-server-liard.vercel.app/reviews/${editReview._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview),
    });

    const result = await res.json();

    if (result.modifiedCount > 0) {
      Swal.fire("Updated!", "Your review has been updated.", "success");
      setEditReview(null);
      refetch();
    } else {
      Swal.fire("Error!", "Failed to update review.", "error");
    }
  };

  if (isLoading) return <p>Loading your reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⭐ My Reviews</h2>
      <div className="overflow-x-auto">
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Comments</th>
                <th>Rating</th>
                <th>Review Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => {
                const { name, university } = getScholarshipDetails(r.scholarshipId);
                return (
                  <tr key={r._id}>
                    <td>{name}</td>
                    <td>{university}</td>
                    <td>{r.reviewText || "—"}</td>
                    <td>{r.rating || "—"}</td>
                    <td>{formatDate(r.reviewDate)}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() => handleDelete(r._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-xs btn-outline btn-info"
                        onClick={() => setEditReview(r)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Edit Your Review</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Comments</label>
                <textarea
                  name="reviewText"
                  defaultValue={editReview.reviewText}
                  className="w-full border rounded p-2"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={editReview.rating}
                  min="1"
                  max="5"
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditReview(null)}
                  className="btn btn-sm btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
