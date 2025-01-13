"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Lottie from "react-lottie";
import PaymentSuccessJson from "../../../public/assets/lottie-animation/payment-success.json";

export default function SuccessPage(props) {
  const [messageBody, setMessageBody] = useState("");
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
  );

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{" "}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </>
        )
      );
    });
  }, [stripePromise]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: PaymentSuccessJson,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={400}
      />
      <h1 className="font-bold text-4xl mt-10">Payment Success!</h1>
      <a href="/" className="border p-2 pl-5 pr-5 rounded-md mt-2">
        Home
      </a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </div>
  );
}
