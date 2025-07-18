import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ApplyScholarship from "./ApplyScholarship";

const stripePromise = loadStripe("pk_test_51RlpeqQsYAtU3HBcjajD1vK9Wikk36yRvpq7aKHdAs0WovKoKEqzO5p2o567K2pYswT6aIsJ6YTkZMEuIouHDZIJ00gRasxPVl");

const ApplyWrapper = () => (
  <Elements stripe={stripePromise}>
    <ApplyScholarship />
  </Elements>
);

export default ApplyWrapper;
