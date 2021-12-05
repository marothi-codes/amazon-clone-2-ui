import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../redux/actions/orderActions";
import {
  ORDER_DELETE_RESET,
  ORDER_LIST_RESET,
} from "../redux/constants/orderConstants";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    error: deleteError,
    loading: deletingOrder,
    success: orderDeleted,
  } = orderDelete;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_LIST_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, orderDeleted, sellerMode, userInfo._id]);

  const handleOrderDelete = (order) => {
    if (window.confirm("Are you sure that you want to delete this order?")) {
      dispatch(deleteOrder(order._id));
      dispatch({ type: ORDER_DELETE_RESET });
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      {deletingOrder && <LoadingBox />}
      {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order}>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>R{order.total.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => handleOrderDelete(order)}
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
