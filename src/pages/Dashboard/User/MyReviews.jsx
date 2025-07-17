import { useQuery } from "@tanstack/react-query";


import Swal from "sweetalert2";

import { useUser } from "../../../contexts/AuthProvider";

const MyReviews = () => {
  const { user } = useUser();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/reviews/user/${user?.email}`);
      return res.json();
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this review?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete"
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        Swal.fire("Deleted!", "Review removed.", "success");
        refetch();
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⭐ My Reviews</h2>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Scholarship</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id}>
              <td>{r.scholarshipName}</td>
              <td>{r.comment}</td>
              <td>{r.reviewDate}</td>
              <td>{r.rating}</td>
              <td>
                <button className="btn btn-xs btn-outline" onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
