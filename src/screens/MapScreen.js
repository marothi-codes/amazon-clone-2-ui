import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";
import { USER_ADDRESS_MAP_CONFIRM } from "../redux/constants/userConstants";

// Component Imports.
import LoadingBox from "../components/LoadingBox";

const libs = ["places"];
const defaultLocation = { lat: -26.195246, lng: 28.034088 };

export default function MapScreen(props) {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/api/config/google");
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const dispatch = useDispatch();

  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      // Dispatch select action.
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });
      alert("Location successfully selected.");
      props.history.push("/checkout");
    } else {
      alert("Please set your address location.");
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported buy this browser.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input placeholder="Type in your address" />
              <button
                type="button"
                className="primary"
                onClick={() => onConfirm()}
              >
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={() => onMarkerLoad()} />
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox />
  );
}
