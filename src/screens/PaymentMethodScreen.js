import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import { savePaymentMethod } from "../redux/actions/cartActions";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) props.history.push("/checkout");

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/payment");
  };

  return (
    <div>
      <Checkout step1 step2 step3 />
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
