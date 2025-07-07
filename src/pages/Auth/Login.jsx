// Register.jsx
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { createUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const { email, password } = data;

    createUser(email, password)
      .then(() => {
        Swal.fire("Success", "Account created successfully!", "success");
      })
      .catch(err => {
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl mb-4">Register</h2>
      <input {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full mb-3" />
      <input {...register("password", {
        required: true,
        minLength: 6,
        pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/
      })} type="password" placeholder="Password" className="input input-bordered w-full mb-3" />
      {errors.password && <p className="text-red-500">Password must be 6+ chars with uppercase and special char</p>}
      <button type="submit" className="btn btn-primary w-full">Register</button>
    </form>
  );
};

export default Login;
