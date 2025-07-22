

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReviewSlider from "./ReviewSlider";

const ScholarshipDetails = () => {
  const { id } = useParams();

  const {
    data: scholarship,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axios.get(`https://scholarship-server-liard.vercel.app/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-600 mt-10">Error: {error.message}</p>;

  const {
    universityName,
    universityImage,
    scholarshipName,
    scholarshipCategory,
    subjectCategory,
    deadline,
    tuitionFees,
    applicationFees,
    serviceCharge,
    stipend,
    postDate,
    universityCity,
    universityCountry,
    description,
  } = scholarship || {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <img src={universityImage} alt="University Logo" className="w-32 mx-auto mb-4" />
      <h2 className="text-2xl font-bold">{universityName || "Unknown University"}</h2>
      <p className="text-gray-600">{universityCity}, {universityCountry}</p>

      <p className="my-2"><strong>Scholarship:</strong> {scholarshipName}</p>
      <p><strong>Category:</strong> {scholarshipCategory}</p>
      <p><strong>Subject:</strong> {subjectCategory}</p>
      <p><strong>Degree:</strong> {scholarship.degree}</p>
      <p><strong>Application Deadline:</strong> {deadline}</p>
      <p><strong>Tuition Fees:</strong> {tuitionFees ? `$${tuitionFees}` : "Not mentioned"}</p>
      <p><strong>Application Fees:</strong> ${applicationFees}</p>
      <p><strong>Service Charge:</strong> ${serviceCharge}</p>
      {stipend && <p><strong>Stipend:</strong> ${stipend}</p>}
      <p className="mt-4">{description || "No additional information available."}</p>
      <p className="mt-2 text-sm text-gray-600">Posted on: {postDate}</p>

      <div className="mt-6">
        <Link to={`/dashboard/user/apply/${id}`} className="btn btn-primary">
          Apply Scholarship
        </Link>
      </div>
      <div className="bg-gray-100 mt-10 py-10 px-4">
      <h2 className="text-2xl text-center font-bold mb-6">💬 What Our Students Say</h2>
      
      <ReviewSlider scholarship={scholarship}></ReviewSlider>
    </div>
    </div>
  );
};

export default ScholarshipDetails;
