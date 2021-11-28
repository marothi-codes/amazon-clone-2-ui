import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../redux/actions/productActions";
import { detailUser } from "../redux/actions/userActions";

import Product from "../components/Product";
import Rating from "../components/Rating";

export default function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    error: errorLoadingProducts,
    loading: loadingProducts,
    products,
  } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  />
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              />
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox />
        ) : errorLoadingProducts ? (
          <MessageBox variant="danger">{errorLoadingProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox>You have no products yet...</MessageBox>
            )}
            <div className="row center">
              {products.map((product) => (
                <Product key={product} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
