import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAILURE,
  ORDER_DELETE_RESET,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAILURE,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_HISTORY_LIST_FAILURE,
  ORDER_HISTORY_LIST_REQUEST,
  ORDER_HISTORY_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAYMENT_FAILURE,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_RESET,
  ORDER_PAYMENT_SUCCESS,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAILURE,
} from "../constants/orderConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPlacementReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return { loading: true };
    case ORDER_PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAYMENT_FAILURE:
      return { loading: false, error: action.payload };
    case ORDER_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const orderHistoryListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_LIST_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_HISTORY_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAILURE:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case ORDER_SUMMARY_REQUEST:
      return { loading: true };
    case ORDER_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case ORDER_SUMMARY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
