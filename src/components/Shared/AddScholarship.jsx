

import React, { useState } from "react";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const initialState = {
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    worldRank: "",
    subjectCategory: "Agriculture",
    scholarshipCategory: "Full fund",
    degree: "Diploma",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    deadline: "",
    postDate: "",
    postedEmail: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const form = new FormData();
    form.append("image", file);

    const imgbbAPIKey = "fc3b149af4e69041d72248d6085358e9"; // Replace with your actual key

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: form,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          universityImage: data.data.url,
        }));
        // Swal.fire("Uploaded!", "Image uploaded successfully!", "success");
      } else {
        Swal.fire("Error!", "Image upload failed!", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire("Error!", "Image upload error!", "error");
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submit if image is not uploaded
    if (!formData.universityImage) {
      Swal.fire({
        icon: "warning",
        title: "Please upload the university logo first.",
      });
      return;
    }

    try {
      const res = await fetch("https://scholarship-server-liard.vercel.app/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.insertedId || result.success) {
        Swal.fire({
          icon: "success",
          title: "Scholarship Added",
          text: "Scholarship added successfully!",
        });
        setFormData(initialState); // Reset the form
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: result.message || "Failed to add scholarship.",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" type="text" name="scholarshipName" placeholder="Scholarship Name" value={formData.scholarshipName} onChange={handleChange} required />
          <input className="input" type="text" name="universityName" placeholder="University Name" value={formData.universityName} onChange={handleChange} required />

          <input className="input" type="text" name="universityCountry" placeholder="University Country" value={formData.universityCountry} onChange={handleChange} required />
          <input className="input" type="text" name="universityCity" placeholder="University City" value={formData.universityCity} onChange={handleChange} required />

          <input className="input" type="number" name="worldRank" placeholder="University World Rank" value={formData.worldRank} onChange={handleChange} required />

          <select className="input" name="subjectCategory" value={formData.subjectCategory} onChange={handleChange}>
            <option>Agriculture</option>
            <option>Engineering</option>
            <option>Doctor</option>
          </select>

          <select className="input" name="scholarshipCategory" value={formData.scholarshipCategory} onChange={handleChange}>
            <option>Full fund</option>
            <option>Partial</option>
            <option>Self-fund</option>
          </select>

          <select className="input" name="degree" value={formData.degree} onChange={handleChange}>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>

          <input className="input" type="text" name="tuitionFees" placeholder="Tuition Fees (optional)" value={formData.tuitionFees} onChange={handleChange} />
          <input className="input" type="text" name="applicationFees" placeholder="Application Fees" value={formData.applicationFees} onChange={handleChange} required />
          <input className="input" type="text" name="serviceCharge" placeholder="Service Charge" value={formData.serviceCharge} onChange={handleChange} required />

          <input className="input" type="date" name="deadline" placeholder="Application Deadline" value={formData.deadline} onChange={handleChange} required />
          <input className="input" type="date" name="postDate" placeholder="Scholarship Post Date" value={formData.postDate} onChange={handleChange} required />
          <input className="input" type="email" name="postedEmail" placeholder="Posted User Email" value={formData.postedEmail} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload University Logo</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input" />
          {uploading && <p className="text-sm text-blue-500 mt-1">Uploading image...</p>}
          {formData.universityImage && !uploading && (
            <img src={formData.universityImage} alt="University Logo" className="w-24 h-24 mt-2 object-contain" />
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Add Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
