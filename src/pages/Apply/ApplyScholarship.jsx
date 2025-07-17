import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Swal from "sweetalert2";

const ApplyScholarship = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const application = {
      ...data,
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      scholarshipId: id,
      applyDate: new Date().toISOString(),
      status: "pending"
    };

    const res = await fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application)
    });

    const result = await res.json();
    if (result.insertedId) {
      Swal.fire("Applied!", "Your application has been submitted.", "success");
      navigate("/dashboard/user/my-applications");
    } else {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-4 font-bold">Apply for Scholarship</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("phone")} placeholder="Phone Number" className="input input-bordered w-full" />
        <input {...register("photo")} placeholder="Photo URL" className="input input-bordered w-full" />
        <input {...register("address")} placeholder="Full Address" className="input input-bordered w-full" />
        <select {...register("gender")} className="select select-bordered w-full">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select {...register("degree")} className="select select-bordered w-full">
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
        <input {...register("ssc")} placeholder="SSC Result" className="input input-bordered w-full" />
        <input {...register("hsc")} placeholder="HSC Result" className="input input-bordered w-full" />
        <select {...register("studyGap")} className="select select-bordered w-full">
          <option value="None">None</option>
          <option value="1 year">1 year</option>
          <option value="2 years">2 years</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyScholarship;
