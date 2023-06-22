import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { verificationToken } from '../verificationToken/VerificationToken';
import { useSelector } from 'react-redux';
import { ErrorAlert } from '../general/alert/AlertComponent';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('productid');
  const quantity = searchParams.get('quantity');

  const token = useSelector((state) => state.auth.token);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await verificationToken('http://localhost:5000/order/config', {
        headers: {
          Authorization: token,
        }
      });
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    };

    fetchConfig();
  }, [token]);

  useEffect(() => {
    setError('');
    const createPaymentIntent = async () => {
      const response = await verificationToken('http://localhost:5000/order/create-payment-intent', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ id: id, quantity: quantity })
      });
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else if (data.message_error) {
        setError(data.message_error)
      } else {
        setError('something went wrong, please try again later');
      };
    };
    createPaymentIntent();
  }, [token, id, quantity]);

  return (
    <div>
      {error &&
        <ErrorAlert
          message={error}
        />
      }
      <h1 style={{textAlign: 'center', fontFamily: 'fantasy'}}>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm id={id} quantity={quantity}/>
        </Elements>
      )}
    </div>
  );
}

export default Payment;