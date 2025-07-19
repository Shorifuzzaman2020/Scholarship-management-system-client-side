

// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { useUser } from "../../../contexts/AuthProvider";

// const MyReviews = () => {
//   const { user } = useUser();

//   const { data: allReviews = [], isLoading, isError, refetch } = useQuery({
//     queryKey: ["all-reviews"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:5000/reviews");
//       if (!res.ok) throw new Error("Failed to fetch reviews");
//       return res.json();
//     }
//   });

//   // Filter the reviews for the current user
//   const reviews = allReviews.filter(r => r.userEmail === user?.email);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       const res = await fetch(`http://localhost:5000/reviews/${id}`, {
//         method: "DELETE",
//       });

//       const result = await res.json();
//       if (result.deletedCount > 0) {
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//         refetch();
//       } else {
//         Swal.fire("Error!", "Failed to delete review.", "error");
//       }
//     }
//   };

//   if (isLoading) return <p>Loading your reviews...</p>;
//   if (isError) return <p>Failed to load reviews.</p>;

//   // Helper to format date nicely
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">⭐ My Reviews</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews found.</p>
//       ) : (
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>Scholarship ID</th>
//               <th>Review</th>
//               <th>Date</th>
//               <th>Rating</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((r) => (
//               <tr key={r._id}>

//                 <td>{r.scholarshipId || "N/A"}</td>
//                 <td>{r.reviewText || "—"}</td>
//                 <td>{formatDate(r.reviewDate)}</td>
//                 <td>{r.rating ?? "-"}</td>
//                 <td>
//                   <button
//                     className="btn btn-xs btn-outline"
//                     onClick={() => handleDelete(r._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default MyReviews;


// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { useState } from "react";
// import { useUser } from "../../../contexts/AuthProvider";

// const MyReviews = () => {
//   const { user } = useUser();
//   const [editReview, setEditReview] = useState(null);

//   const { data: reviews = [], isLoading, isError, refetch } = useQuery({
//     queryKey: ["user-reviews", user?.email],
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:5000/reviews/user/${user?.email}`);
//       if (!res.ok) throw new Error("Failed to fetch reviews");
//       return res.json();
//     },
//   });

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       const res = await fetch(`http://localhost:5000/reviews/${id}`, {
//         method: "DELETE",
//       });

//       const result = await res.json();
//       if (result.deletedCount > 0) {
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//         refetch();
//       } else {
//         Swal.fire("Error!", "Failed to delete review.", "error");
//       }
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const updatedReview = {
//       reviewText: form.reviewText.value,
//       rating: form.rating.value,
//     };

//     const res = await fetch(`http://localhost:5000/reviews/${editReview._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedReview),
//     });

//     const result = await res.json();

//     if (result.modifiedCount > 0) {
//       Swal.fire("Updated!", "Your review has been updated.", "success");
//       setEditReview(null);
//       refetch();
//     } else {
//       Swal.fire("Error!", "Failed to update review.", "error");
//     }
//   };

//   if (isLoading) return <p>Loading your reviews...</p>;
//   if (isError) return <p>Failed to load reviews.</p>;

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">⭐ My Reviews</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews found.</p>
//       ) : (
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>Scholarship Name</th>
//               <th>University Name</th>
//               <th>Comments</th>
//               <th>Review Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.scholarshipName || "N/A"}</td>
//                 <td>{r.universityName || "N/A"}</td>
//                 <td>{r.reviewText || "—"}</td>
//                 <td>{formatDate(r.reviewDate)}</td>
//                 <td className="flex gap-2">
//                   <button
//                     className="btn btn-xs btn-outline btn-error"
//                     onClick={() => handleDelete(r._id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="btn btn-xs btn-outline btn-info"
//                     onClick={() => setEditReview(r)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Modal for Editing */}
//       {editReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96">
//             <h3 className="text-lg font-bold mb-4">Edit Your Review</h3>
//             <form onSubmit={handleEditSubmit}>
//               <div className="mb-4">
//                 <label className="block mb-1">Comments</label>
//                 <textarea
//                   name="reviewText"
//                   defaultValue={editReview.reviewText}
//                   className="w-full border rounded p-2"
//                   required
//                 ></textarea>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Rating (1-5)</label>
//                 <input
//                   type="number"
//                   name="rating"
//                   defaultValue={editReview.rating}
//                   min="1"
//                   max="5"
//                   className="w-full border rounded p-2"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setEditReview(null)}
//                   className="btn btn-sm btn-outline"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;





// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { useState } from "react";
// import { useUser } from "../../../contexts/AuthProvider";

// const MyReviews = () => {
//   const { user } = useUser();
//   const [editReview, setEditReview] = useState(null);

//   const { 
//     data: reviews = [], 
//     isLoading, 
//     isError, 
//     refetch 
//   } = useQuery({
//     queryKey: ["user-reviews", user?.email],
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:5000/reviews/user/${user?.email}`);
//       if (!res.ok) throw new Error("Failed to fetch reviews");
//       return res.json();
//     },
//   });

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       const res = await fetch(`http://localhost:5000/reviews/${id}`, {
//         method: "DELETE",
//       });

//       const result = await res.json();
//       if (result.deletedCount > 0) {
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//         refetch();
//       } else {
//         Swal.fire("Error!", "Failed to delete review.", "error");
//       }
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const updatedReview = {
//       reviewText: form.reviewText.value,
//       rating: form.rating.value,
//     };

//     const res = await fetch(`http://localhost:5000/reviews/${editReview._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedReview),
//     });

//     const result = await res.json();

//     if (result.modifiedCount > 0) {
//       Swal.fire("Updated!", "Your review has been updated.", "success");
//       setEditReview(null);
//       refetch();
//     } else {
//       Swal.fire("Error!", "Failed to update review.", "error");
//     }
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
  
//   if (isError) return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//       <strong>Error: </strong> Failed to load reviews
//     </div>
//   );

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString(undefined, { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">⭐ My Reviews</h2>
      
//       {reviews.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <p className="text-gray-600">You haven't submitted any reviews yet.</p>
//           <p className="mt-2 text-sm text-gray-500">
//             Submit your first review on a scholarship page!
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Scholarship
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   University
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Review
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rating
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {reviews.map((review) => (
//                 <tr key={review._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {review.scholarshipName || "Unknown Scholarship"}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">
//                       {review.universityName || "Unknown University"}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900 max-w-xs truncate">
//                       {review.reviewText || "—"}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <span className="text-yellow-500 mr-1">★</span>
//                       <span className="text-sm text-gray-900">
//                         {review.rating}/5
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(review.reviewDate)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => setEditReview(review)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(review._id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Edit Review Modal */}
//       {editReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-bold text-gray-800">Edit Your Review</h3>
//                 <button
//                   onClick={() => setEditReview(null)}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleEditSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Review
//                   </label>
//                   <textarea
//                     name="reviewText"
//                     defaultValue={editReview.reviewText}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     rows="4"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Rating
//                   </label>
//                   <select
//                     name="rating"
//                     defaultValue={editReview.rating}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     required
//                   >
//                     <option value="">Select rating</option>
//                     <option value="1">1 Star</option>
//                     <option value="2">2 Stars</option>
//                     <option value="3">3 Stars</option>
//                     <option value="4">4 Stars</option>
//                     <option value="5">5 Stars</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setEditReview(null)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;


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
        const res = await axios.get(`http://localhost:5000/scholarships`);
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
      const res = await fetch(`http://localhost:5000/reviews/user/${user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const getScholarshipDetails = (scholarshipId) => {
    const match = scholarships.find(s => s._id?.toString() === scholarshipId?.toString());
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedReview = {
      reviewText: form.reviewText.value,
      rating: form.rating.value,
    };

    const res = await fetch(`http://localhost:5000/reviews/${editReview._id}`, {
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
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Comments</th>
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
