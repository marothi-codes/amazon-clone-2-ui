import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../redux/actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_DETAILS_RESET,
} from "../redux/constants/productConstants";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

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

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productCreationSuccess) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/products/${createdProduct._id}/edit`);
    }
    if (productDeleted) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
    dispatch({ type: PRODUCT_DETAILS_RESET });
  }, [
    createdProduct,
    dispatch,
    navigate,
    productCreationSuccess,
    productDeleted,
    sellerMode,
    userInfo._id,
    pageNumber,
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
        <>
          <table className="table">
            <thead>
              <tr>
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
                  <td>{product.name}</td>
                  <td>R{product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => navigate(`/product/${product._id}/edit`)}
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
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/products/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
