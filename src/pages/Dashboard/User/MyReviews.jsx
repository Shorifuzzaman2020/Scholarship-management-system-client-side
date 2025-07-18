

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useUser } from "../../../contexts/AuthProvider";

const MyReviews = () => {
  const { user } = useUser();

  const { data: allReviews = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reviews");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    }
  });

  // Filter the reviews for the current user
  const reviews = allReviews.filter(r => r.userEmail === user?.email);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:5000/reviews/${id}`, {
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

  if (isLoading) return <p>Loading your reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;

  // Helper to format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⭐ My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Scholarship ID</th>
              <th>Review</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id}>
                
                <td>{r.scholarshipId || "N/A"}</td>
                <td>{r.reviewText || "—"}</td>
                <td>{formatDate(r.reviewDate)}</td>
                <td>{r.rating ?? "-"}</td>
                <td>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReviews;
