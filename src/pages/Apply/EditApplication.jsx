

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/applications/${id}`)
      .then(res => {
        setApplication(res.data);
        reset({
          phone: res.data.phone,
          photo: res.data.photo,
          address: res.data.address,
          gender: res.data.gender,
          degree: res.data.degree,
          sscResult: res.data.sscResult,
          hscResult: res.data.hscResult,
          studyGap: res.data.studyGap
        });
      })
      .catch(() => toast.error("Failed to fetch application data"));
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/applications/${id}`, data);
      Swal.fire("Updated!", "Your application has been updated.", "success");
      navigate("/dashboard/user/my-scholarships");
    } catch (err) {
      toast.error("Failed to update application");
    }
  };

  if (!application) return <p className="text-center">Loading...</p>;

  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">✍️ Edit Your Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
        <input {...register("phone", { required: true })} placeholder="Phone Number" className="input input-bordered w-full" />
        <input {...register("photo", { required: true })} placeholder="Photo URL" className="input input-bordered w-full" />
        <input {...register("address", { required: true })} placeholder="Address" className="input input-bordered w-full" />

        <select {...register("gender", { required: true })} className="select select-bordered w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select {...register("degree", { required: true })} className="select select-bordered w-full">
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <input {...register("sscResult", { required: true })} placeholder="SSC Result" className="input input-bordered w-full" />
        <input {...register("hscResult", { required: true })} placeholder="HSC Result" className="input input-bordered w-full" />

        <select {...register("studyGap")} className="select select-bordered w-full">
          <option value="">Study Gap?</option>
          <option value="None">None</option>
          <option value="1 Year">1 Year</option>
          <option value="2+ Years">2+ Years</option>
        </select>

        <button type="submit" className="btn btn-primary w-full mt-4">Update Application</button>
      </form>
    </div>
  );
};

export default EditApplication;
