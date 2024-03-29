import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import { listTopSellers } from "../redux/actions/userActions";
import { Link, useParams } from "react-router-dom";

// Components
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Carousel } from "react-responsive-carousel";

// Stylesheets
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomeScreen() {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userTopSellerList = useSelector((state) => state.userTopSellerList);
  const {
    error: errorLoadingTopSellers,
    loading: loadingTopSellers,
    users: topSellers,
  } = userTopSellerList;

  useEffect(() => {
    dispatch(listProducts({ pageNumber }));
    dispatch(listTopSellers());
  }, [dispatch, pageNumber]);

  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingTopSellers ? (
        <LoadingBox />
      ) : errorLoadingTopSellers ? (
        <MessageBox variant="danger">{errorLoadingTopSellers}</MessageBox>
      ) : (
        <>
          {topSellers.length === 0 && <MessageBox>No sellers yet.</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {topSellers.map((seller) => (
              <div key={seller}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && (
            <MessageBox>We have no stock yet...</MessageBox>
          )}
          <div className="row center">
            {products.map((product) => (
              <Product key={product} product={product}></Product>
            ))}
          </div>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/pageNumber/${x + 1}`}
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
