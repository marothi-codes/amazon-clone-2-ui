import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";

import Checkout from "../components/Checkout";

export default function CheckoutScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: mapAddress } = userAddressMap;

  if (!userInfo) props.history.push("/sign-in");

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLat = mapAddress ? mapAddress.lat : lat;
    const newLng = mapAddress ? mapAddress.lng : lng;

    if (mapAddress) {
      setLat(mapAddress.lat);
      setLng(mapAddress.lng);
    }

    let moveOn = true;

    if (!newLat || !newLng)
      moveOn = window.confirm("You did not set your map location. Continue?");

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );

      props.history.push("/payment-method");
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div>
      <Checkout step1 step2 />
      <form onSubmit={(e) => handleSubmit(e)} class="form">
        <div>
          <h1>Shipping Address</h1>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="number"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        {/* Choose on Map */}
        <div>
          <label htmlFor="chooseOnMap">Choose On Map:</label>
          <button type="button" onClick={() => chooseOnMap()}>
            Choose On Map
          </button>
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
