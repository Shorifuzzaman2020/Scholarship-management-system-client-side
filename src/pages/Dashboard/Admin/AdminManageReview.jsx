
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminManageReview = () => {
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reviews");
      return res.json();
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this review?",
      text: "This action cannot be undone.",
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
        Swal.fire("Deleted!", "Review has been removed.", "success");
        refetch();
      } else {
        Swal.fire("Error!", "Failed to delete the review.", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">⭐ All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r._id} className="card bg-white shadow-md border">
              <div className="card-body">
                <div className=" gap-3 mb-3">
                  <div className="flex justify-center mb-3">
                    <img
                      src={r.reviewerImage || "/default-avatar.png"}
                      alt={r.reviewerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold mb-3"><strong>Reviwer Name: </strong>{r.reviewerName}</p>
                    <p className="text-xs text-gray-500"><strong>Review Date: </strong>{r.reviewDate}</p>
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="text-md font-bold text-blue-600">Email: {r.userEmail}</h3>
                  <p className="text-sm font-medium">{r.universityName}</p>
                  <p className="text-sm text-gray-500">{r.subjectCategory}</p>
                </div>

                <p className=" text-gray-700"><strong>Comment:</strong> {r.reviewText}</p>
                <p className="text-yellow-500 font-medium">⭐ {r.rating}/5</p>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageReview;
