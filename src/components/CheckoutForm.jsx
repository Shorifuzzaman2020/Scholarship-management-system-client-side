import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

const CheckoutForm = ({ user, scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [paid, setPaid] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    photo: "",
    address: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
  });

  const getClientSecret = async () => {
    const res = await axios.post("http://localhost:5000/create-payment-intent", {
      amount: 5000, // $50.00 (5000 cents)
    });
    setClientSecret(res.data.clientSecret);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    if (error) return toast.error(error.message);
    if (paymentIntent.status === "succeeded") {
      setPaid(true);
      toast.success("Payment successful!");
    }
  };

  const handleSubmitApplication = async () => {
    const applicationData = {
      ...formData,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      scholarshipId: scholarship._id,
      university: scholarship.university,
      scholarshipCategory: scholarship.category,
      subjectCategory: scholarship.subject,
      appliedDate: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:5000/apply-scholarship", applicationData);
      if (res.data.success) {
        Swal.fire("Success", "Scholarship applied successfully!", "success");
      }
    } catch (err) {
      toast.error("Error applying scholarship.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      {!clientSecret && (
        <button onClick={getClientSecret} className="btn btn-primary w-full mb-4">
          Apply Scholarship ($50)
        </button>
      )}

      {clientSecret && !paid && (
        <form onSubmit={handlePayment}>
          <CardElement className="border p-4 rounded" />
          <button className="btn btn-success mt-4 w-full" type="submit">Pay Now</button>
        </form>
      )}

      {paid && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Complete Your Application</h2>
          <div className="grid gap-3">
            <input placeholder="Phone" className="input input-bordered w-full" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <input placeholder="Photo URL" className="input input-bordered w-full" onChange={(e) => setFormData({ ...formData, photo: e.target.value })} />
            <input placeholder="Address" className="input input-bordered w-full" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            <select className="select select-bordered w-full" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
              <option disabled selected>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select className="select select-bordered w-full" onChange={(e) => setFormData({ ...formData, degree: e.target.value })}>
              <option disabled selected>Select Degree</option>
              <option>Diploma</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>
            <input placeholder="SSC Result" className="input input-bordered w-full" onChange={(e) => setFormData({ ...formData, sscResult: e.target.value })} />
            <input placeholder="HSC Result" className="input input-bordered w-full" onChange={(e) => setFormData({ ...formData, hscResult: e.target.value })} />
            <select className="select select-bordered w-full" onChange={(e) => setFormData({ ...formData, studyGap: e.target.value })}>
              <option disabled selected>Select Study Gap (if any)</option>
              <option>None</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3+ Years</option>
            </select>
            <input readOnly className="input input-bordered w-full bg-gray-100" value={scholarship.university} />
            <input readOnly className="input input-bordered w-full bg-gray-100" value={scholarship.category} />
            <input readOnly className="input input-bordered w-full bg-gray-100" value={scholarship.subject} />
            <button onClick={handleSubmitApplication} className="btn btn-primary w-full mt-4">Submit Application</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
