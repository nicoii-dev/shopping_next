import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment(props) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState({});

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    try {
      axios
        .post(
          "http://localhost:8000/api/create-payment-intent",
          { amount: 300 },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then(function (response) {
          setClientSecret(response.data.client_secret)
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
    // fetch("http://localhost:8000/api/create-payment-intent")
    //   .then((res) => res.json())
    //   .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, []);
  console.log(clientSecret.client_secret)
  return (
    <>
      <h1>Payment</h1>
      {/* {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret.client_secret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      )} */}
    </>
  );
}

export default Payment;
