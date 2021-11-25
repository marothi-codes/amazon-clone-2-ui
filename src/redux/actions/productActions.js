import axios from "axios";
import {
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAILURE, payload: error.message });
  }
};

export const detailProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/products/",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
