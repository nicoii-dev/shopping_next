"use client"

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

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
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div>
    </>
  );
}
