import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, listProducts } from "../redux/actions/productActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../redux/constants/productConstants";

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (productCreationSuccess) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/products/${createdProduct._id}/edit`);
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, productCreationSuccess, props.history]);

  const handleCreate = () => {
    dispatch(createProduct());
  };

  const handleDelete = () => {
    // TODO: Dispatch product delete func.
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={() => handleCreate}>
          Create Product
        </button>
      </div>
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
            {products.map((product, idx) => (
              <tr key={idx}>
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
