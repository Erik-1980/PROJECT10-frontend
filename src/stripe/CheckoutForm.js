import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from './Stripe.module.css';
import { Button } from 'antd';
import { verificationToken } from "../verificationToken/VerificationToken";
import { useSelector } from 'react-redux';

export default function CheckoutForm({ id, quantity }) {
  const stripe = useStripe();
  const elements = useElements();
  const token = useSelector((state) => state.auth.token);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    verificationToken('http://localhost:5000/order/updatequantity', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ id: id, quantity: quantity })
      })

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };

  return (
    <form className={styles.paymentForm} onSubmit={handleSubmit}>
      <PaymentElement className={styles.paymentForm} />
      <Button
        type="primary"
        disabled={isProcessing || !stripe || !elements}
        htmlType="submit"
      >
        {isProcessing ? "Processing ..." : "Pay now"}
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
}