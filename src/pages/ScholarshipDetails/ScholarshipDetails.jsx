import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewSlider from "./ReviewSlider";

const ScholarshipDetails = () => {
  const { id } = useParams();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axios.get(`https://your-server.com/scholarships/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  const {
    universityName, universityLogo, scholarshipCategory, location, subjectCategory,
    applicationDeadline, description, stipend, postDate, applicationFees, serviceCharge
  } = scholarship;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <img src={universityLogo} alt="logo" className="w-32 mb-4" />
      <h2 className="text-2xl font-bold">{universityName}</h2>
      <p>{location.city}, {location.country}</p>
      <p className="my-2"><strong>Subject:</strong> {subjectCategory}</p>
      <p><strong>Deadline:</strong> {applicationDeadline}</p>
      <p><strong>Fees:</strong> ${applicationFees}</p>
      <p><strong>Service Charge:</strong> ${serviceCharge}</p>
      {stipend && <p><strong>Stipend:</strong> ${stipend}</p>}
      <p className="mt-4">{description}</p>
      <p className="mt-2 text-sm text-gray-600">Posted on: {postDate}</p>

      <div className="mt-6">
        <Link to={`/apply/${id}`} className="btn btn-primary">Apply Scholarship</Link>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
        <ReviewSlider scholarshipId={id} />
      </div>
    </div>
  );
};

export default ScholarshipDetails;
