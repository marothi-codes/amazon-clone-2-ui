import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../redux/actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../redux/constants/productConstants";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: productCreationError,
    loading: creatingProduct,
    product: createdProduct,
    success: productCreationSuccess,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: deletingProduct,
    error: deleteError,
    success: productDeleted,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productCreationSuccess) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/products/${createdProduct._id}/edit`);
    }
    if (productDeleted) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [
    createdProduct,
    dispatch,
    productCreationSuccess,
    productDeleted,
    props.history,
  ]);

  const handleCreate = () => {
    dispatch(createProduct());
  };

  const handleDelete = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={() => handleCreate}>
          Create Product
        </button>
      </div>

      {deletingProduct && <LoadingBox />}
      {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}

      {creatingProduct && <LoadingBox />}
      {productCreationError && (
        <MessageBox variant="danger">{productCreationError}</MessageBox>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>R{product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => handleDelete(product)}
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
