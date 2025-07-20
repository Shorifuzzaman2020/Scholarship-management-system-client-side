

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const TopScholarships = () => {
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/scholarships/top");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="my-10 max-w-6xl mt-10 mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">🎯 Top Scholarships</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scholarships.map((s) => (
          <div key={s._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={s.universityImage}
                alt="University Logo"
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{s.universityName}</h2>
              <p>
                {s.scholarshipCategory} - {s.subjectCategory}
              </p>
              <p>Fees: ${s.applicationFees}</p>
              <p>Deadline: {s.deadline}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/scholarships/${s._id}`}
                  className="btn btn-outline btn-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link to="/scholarships" className="btn bg-green-500 text-white">
          See All Scholarships
        </Link>
      </div>
    </div>
  );
};

export default TopScholarships;
