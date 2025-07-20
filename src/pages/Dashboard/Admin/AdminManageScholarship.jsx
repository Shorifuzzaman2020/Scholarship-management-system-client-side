

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState, useRef } from "react";

const AdminManageScholarship = () => {
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const modalRef = useRef(null);
  const detailsModalRef = useRef(null);  // Reference for the details modal

  const { data: scholarships = [], refetch, isLoading } = useQuery({
    queryKey: ["manage-scholarships"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/scholarships");
      return res.json();
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:5000/scholarships/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        Swal.fire("Deleted!", "Scholarship has been removed.", "success");
        refetch();
      }
    }
  };

  const openEditModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    modalRef.current.showModal();
  };

  const openDetailsModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    detailsModalRef.current.showModal(); // Show the details modal
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      scholarshipName: form.name.value,
      applicationFees: parseFloat(form.fees.value),
      degree: form.degree.value,
    };

    const res = await fetch(`http://localhost:5000/scholarships/${selectedScholarship._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
      Swal.fire("Updated!", "Scholarship updated.", "success");
      refetch();
      modalRef.current.close();
      setSelectedScholarship(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🏫 Manage Scholarships</h2>

      {isLoading ? (
        <div className="text-center">Loading scholarships...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Scholarship Name</th>
                <th>University</th>
                <th>Subject</th>
                <th>Degree</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s._id}>
                  <td>{s.scholarshipName}</td>
                  <td>{s.universityName}</td>
                  <td>{s.subjectCategory}</td>
                  <td>{s.degree}</td>
                  <td>${s.applicationFees}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => openEditModal(s)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(s._id)}
                    >
                      ❌ Delete
                    </button>
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => openDetailsModal(s)} // Open details modal
                    >
                      🧐 Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔧 Edit Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Scholarship</h3>

          {selectedScholarship && (
            <form method="dialog" onSubmit={handleEditSubmit}>
              <label className="label">Scholarship Name</label>
              <input
                name="name"
                defaultValue={selectedScholarship.scholarshipName}
                className="input input-bordered w-full mb-2"
                required
              />

              <label className="label">Application Fees</label>
              <input
                name="fees"
                type="number"
                min="0"
                defaultValue={selectedScholarship.applicationFees}
                className="input input-bordered w-full mb-2"
                required
              />

              <label className="label">Degree</label>
              <select
                name="degree"
                defaultValue={selectedScholarship.degree}
                className="select select-bordered w-full mb-4"
              >
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  ✅ Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => modalRef.current.close()}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* 📋 Details Modal */}
      <dialog ref={detailsModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Scholarship Details</h3>

          {selectedScholarship && (
            <div>
              <p><strong>Scholarship Name:</strong> {selectedScholarship.scholarshipName}</p>
              <p><strong>University:</strong> {selectedScholarship.universityName}</p>
              <p><strong>Country:</strong> {selectedScholarship.universityCountry}</p>
              <p><strong>World Ranking:</strong> {selectedScholarship.worldRank}</p>
              <p><strong>Tution Fees:</strong> {selectedScholarship.tuitionFees}</p>
              <p><strong>Scholarship Category:</strong> {selectedScholarship.scholarshipCategory}</p>
              <p><strong>Subject:</strong> {selectedScholarship.subjectCategory}</p>
              <p><strong>Degree:</strong> {selectedScholarship.degree}</p>
              <p><strong>Application Fees:</strong> ${selectedScholarship.applicationFees}</p>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => detailsModalRef.current.close()}
                >
                  ❌ Close
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AdminManageScholarship;
