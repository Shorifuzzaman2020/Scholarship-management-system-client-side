

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useUser } from "../../contexts/AuthProvider";

const stripePromise = loadStripe("pk_test_51RlpeqQsYAtU3HBcjajD1vK9Wikk36yRvpq7aKHdAs0WovKoKEqzO5p2o567K2pYswT6aIsJ6YTkZMEuIouHDZIJ00gRasxPVl");

const CheckoutForm = ({ scholarship, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State for uploaded image

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (scholarship?.applicationFees) {
      axios
        .post("https://scholarship-server-liard.vercel.app/create-payment-intent", {
          applicationFees: scholarship.applicationFees,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => toast.error("Failed to initialize payment."));
    }
  }, [scholarship]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
        setUploadedImage(data.data.url); // Set uploaded image URL
      } else {
        Swal.fire("Error!", "Image upload failed!", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire("Error!", "Image upload error!", "error");
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to apply.");
      return;
    }

    if (!stripe || !elements) return;
    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const billingDetails = {
      name: user?.displayName || "Unknown User",
      email: user?.email || "unknown@example.com",
    };

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: billingDetails,
        },
      }
    );

    if (confirmError) {
      toast.error(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const applicationData = {
        ...data,
        userName: user?.displayName || "Unknown User",
        userEmail: user?.email || "unknown@example.com",
        userId: user?.uid || "unknown_uid",
        scholarshipId: scholarship._id,
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        applyDate: new Date().toISOString(),
        status: "pending",
        paymentStatus: "paid",
        applicationFees: scholarship.applicationFees,
        photo: uploadedImage, // Add uploaded image URL to application data
      };

      try {
        await axios.post("https://scholarship-server-liard.vercel.app/applications", applicationData);
        Swal.fire("Success", "Scholarship applied successfully!", "success");
        navigate("/dashboard/user/my-applications");
      } catch (err) {
        toast.error("Application submission failed!");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
      <input {...register("phone", { required: true })} placeholder="Phone Number" className="input input-bordered w-full" />
      
      <input {...register("address", { required: true })} placeholder="Address (village, district, country)" className="input input-bordered w-full" />
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

      <input value={scholarship.universityName} readOnly className="input input-bordered w-full" />
      <input value={scholarship.scholarshipCategory} readOnly className="input input-bordered w-full" />
      <input value={scholarship.subjectCategory} readOnly className="input input-bordered w-full" />
      
      {/* Image upload input */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Your Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="input input-bordered w-full"
        />
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" className="w-24 h-24 mt-2 object-contain" />
        )}
      </div>

      <CardElement className="border p-3 rounded-md" />

      <button disabled={!stripe || !clientSecret || loading} className="btn btn-primary w-full mt-4">
        {loading ? "Processing..." : "Submit & Pay"}
      </button>
    </form>
  );
};

const ApplyScholarship = () => {
  const { id } = useParams();
  const { user} = useUser(); 
  const { data: scholarship, isLoading, isError, error } = useQuery({
    queryKey: ["scholarships", id],
    queryFn: async () => {
      const res = await axios.get(`https://scholarship-server-liard.vercel.app/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Apply for {scholarship.scholarshipName}</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm scholarship={scholarship} user={user} />
      </Elements>
    </div>
  );
};

export default ApplyScholarship;
