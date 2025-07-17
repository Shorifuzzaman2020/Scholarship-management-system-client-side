

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/scholarships");
        setScholarships(res.data);
        setFilteredScholarships(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredScholarships(scholarships);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = scholarships.filter((sch) =>
        sch.universityName.toLowerCase().includes(lowerSearch) ||
        sch.scholarshipName.toLowerCase().includes(lowerSearch) ||
        sch.degree.toLowerCase().includes(lowerSearch)
      );
      setFilteredScholarships(filtered);
    }
  }, [searchTerm, scholarships]);

  if (loading) return <p className="text-center mt-6">Loading scholarships...</p>;

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <h2 className="text-2xl font-bold mb-4">All Scholarships</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by university, scholarship name, or degree"
          className="border p-2 rounded w-full max-w-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.length === 0 ? (
          <p>No scholarships found.</p>
        ) : (
          filteredScholarships.map((sch) => (
            <div key={sch._id} className="border p-4 rounded shadow-sm flex flex-col justify-between">
              <img
                src={sch.universityImage}
                alt={sch.universityName}
                className="h-32 w-full object-contain mb-3"
              />
              <h3 className="font-semibold text-lg">{sch.universityName}</h3>
              <p className="text-sm mb-1">
                <strong>Scholarship:</strong> {sch.scholarshipName}
              </p>
              <p className="text-sm mb-1">
                <strong>Category:</strong> {sch.scholarshipCategory}
              </p>
              <p className="text-sm mb-1">
                <strong>Degree:</strong> {sch.degree}
              </p>
              <p className="text-sm mb-1">
                <strong>Application Fee:</strong> ${sch.applicationFees}
              </p>
              <p className="text-sm mb-2">
                <strong>Deadline:</strong> {sch.deadline}
              </p>

              {/* ✅ See Details Button */}
              <Link
                to={`/scholarships/${sch._id}`}
                className="mt-auto bg-blue-600 text-white text-center py-1 px-3 rounded hover:bg-blue-700 transition"
              >
                See Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
