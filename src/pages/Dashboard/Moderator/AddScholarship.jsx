import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("https://your-server.com/scholarships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.insertedId) {
      Swal.fire("Success!", "Scholarship added.", "success");
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">➕ Add Scholarship</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <input {...register("scholarshipName")} placeholder="Scholarship Name" className="input input-bordered" />
        <input {...register("universityName")} placeholder="University Name" className="input input-bordered" />
        <input {...register("universityLogo")} placeholder="University Logo URL" className="input input-bordered" />
        <input {...register("country")} placeholder="Country" className="input input-bordered" />
        <input {...register("city")} placeholder="City" className="input input-bordered" />
        <input {...register("worldRank")} placeholder="World Rank" className="input input-bordered" />
        <select {...register("subjectCategory")} className="select select-bordered">
          <option>Agriculture</option>
          <option>Engineering</option>
          <option>Doctor</option>
        </select>
        <select {...register("scholarshipCategory")} className="select select-bordered">
          <option>Full Fund</option>
          <option>Partial</option>
          <option>Self Fund</option>
        </select>
        <select {...register("degree")} className="select select-bordered">
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>
        <input {...register("tuitionFees")} placeholder="Tuition Fees" className="input input-bordered" />
        <input {...register("applicationFees")} placeholder="Application Fees" className="input input-bordered" />
        <input {...register("serviceCharge")} placeholder="Service Charge" className="input input-bordered" />
        <input {...register("applicationDeadline")} placeholder="Application Deadline" className="input input-bordered" />
        <input {...register("postDate")} placeholder="Post Date" className="input input-bordered" />
        <input {...register("postedBy")} placeholder="Posted User Email" className="input input-bordered" />
        <textarea {...register("description")} placeholder="Scholarship Description" className="textarea textarea-bordered" />
        <button type="submit" className="btn btn-primary">Add Scholarship</button>
      </form>
    </div>
  );
};

export default AddScholarship;
