import React from "react";
import Header from "../components/Layout/Header";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default function StripeCheckoutPage() {
  const onToken = (token) => {
    const reqData = {
      url: "/api/stripe/checkout",
      method: "POST",
      data: token,
    };
    axios(reqData).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <Header />
      <div className="container text-gray-800">
        <h1 className="text-2xl font-semibold mt-8">
          Checking Out With Stripe
        </h1>
        <StripeCheckout
          name="Red Bag Store"
          description="Online Store"
          amount={50000}
          token={onToken}
          stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
        />
      </div>
    </>
  );
}
