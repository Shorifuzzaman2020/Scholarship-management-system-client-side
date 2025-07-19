import React from "react";
import AddScholarship from "../../../components/Shared/AddScholarship";

const AdminAddScholarship = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add Scholarship (Admin)</h2>

      {/* <AddScholarshipForm /> */}
      <AddScholarship></AddScholarship>
    </div>
  );
};

export default AdminAddScholarship;
