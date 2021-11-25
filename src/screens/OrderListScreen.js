import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../redux/actions/orderActions";
import { ORDER_DELETE_RESET } from "../redux/constants/orderConstants";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    error: deleteError,
    loading: deletingOrder,
    success: orderDeleted,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, orderDeleted]);

  const handleOrderDelete = (order) => {
    if (window.confirm("Are you sure that you want to delete this order?"))
      dispatch(deleteOrder(order._id));
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
              <th>ID</th>
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
                <td>{order._id}</td>
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
                    onClick={() => props.history.push(`/order/${order._id}`)}
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
