import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllReviews = () => {
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
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⭐ All Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r._id} className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r.reviewerImage || "/default-avatar.png"}
                    alt={r.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{r.reviewerName}</p>
                    <p className="text-xs text-gray-500">{r.reviewDate}</p>
                  </div>
                </div>

                <h3 className="text-md font-bold">{r.scholarshipName}</h3>
                <p className="text-sm text-gray-600">{r.universityName}</p>
                <p className="text-sm text-blue-600">{r.subjectCategory}</p>
                <p className="my-2">{r.comment}</p>
                <p className="text-yellow-500">⭐ {r.rating}/5</p>

                <div className="card-actions justify-end mt-2">
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

export default AllReviews;
