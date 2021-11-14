import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";

import Checkout from "../components/Checkout";

export default function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) props.history.push("/checkout");

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("order");
  };

  return (
    <div>
      <Checkout step1 step2 step3 />
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <div>
          <h1>Payment Method</h1>
        </div>

        {/* PayPal */}
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
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        {/* Stripe */}
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="stripe"
              value="Stripe"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>

        {/* Submit */}
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
