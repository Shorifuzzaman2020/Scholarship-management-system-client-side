import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["manage-scholarships"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/scholarships");
      return res.json();
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🏫 Manage Scholarships</h2>
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
                  <button className="btn btn-xs btn-info" onClick={() => document.getElementById(`editModal-${s._id}`).showModal()}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-xs btn-error" onClick={() => handleDelete(s._id)}>
                    ❌ Delete
                  </button>
                  {/* 🔍 Scholarship Details Button - You can optionally add a modal or redirect */}
                </td>

                {/* ✏️ Edit Modal */}
                <dialog id={`editModal-${s._id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg mb-2">Edit Scholarship</h3>
                    <form method="dialog" onSubmit={(e) => {
                      e.preventDefault();
                      const updatedData = {
                        scholarshipName: e.target.name.value,
                        applicationFees: parseFloat(e.target.fees.value),
                        degree: e.target.degree.value,
                      };

                      fetch(`http://localhost:5000/scholarships/${s._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedData),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.modifiedCount > 0) {
                            Swal.fire("Updated!", "Scholarship updated.", "success");
                            refetch();
                            document.getElementById(`editModal-${s._id}`).close();
                          }
                        });
                    }}>
                      <input defaultValue={s.scholarshipName} name="name" className="input input-bordered w-full mb-2" />
                      <input defaultValue={s.applicationFees} name="fees" className="input input-bordered w-full mb-2" />
                      <select defaultValue={s.degree} name="degree" className="select select-bordered w-full mb-4">
                        <option>Diploma</option>
                        <option>Bachelor</option>
                        <option>Masters</option>
                      </select>
                      <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" className="btn" onClick={() => document.getElementById(`editModal-${s._id}`).close()}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
