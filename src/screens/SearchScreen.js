import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { prices, ratings } from "../helpers/utils";
import { listProducts } from "../redux/actions/productActions";

// Component Imports.
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";

export default function SearchScreen() {
  const navigate = useNavigate();
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newset",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    error: errorLoadingCategories,
    loading: loadingCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [dispatch, name, category, min, max, rating, order, pageNumber]);

  const getFilterUrl = (filter) => {
    const pageFilter = filter.page || pageNumber;
    const categoryFilter = filter.category || category;
    const nameFilter = filter.name || name;
    const ratingFilter = filter.rating || rating;
    const sortOrder = filter.order || order;
    const minFilter = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const maxFilter = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${categoryFilter}/name/${nameFilter}/min/${minFilter}/max/${maxFilter}/rating/${ratingFilter}/order/${sortOrder}/pageNumber/${pageFilter}`;
  };

  return (
    <div>
      <div className="row center">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div style={{ marginRight: "0.5rem" }}>
              <strong>{products.length} Results </strong>
            </div>
          </>
        )}
        <br />
        <div>
          <div>
            Sort by{" "}
            <select
              value={order}
              onChange={(e) => {
                navigate(getFilterUrl({ order: e.target.value }));
              }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="toprated">Avg. Customer Reviews</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category</li>
          </ul>
          {loadingCategories ? (
            <LoadingBox />
          ) : errorLoadingCategories ? (
            <MessageBox variant="danger">{errorLoadingCategories}</MessageBox>
          ) : (
            <ul>
              <li>
                <Link
                  className={"all" === category ? "active" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link to={getFilterUrl({ category: c })}>{c}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Price</h3>
          <ul>
            {prices.map((p) => (
              <li key={p.name}>
                <Link
                  to={getFilterUrl({ min: p.min, max: p.max })}
                  className={
                    `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                  }
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Average Customer Reviews</h3>
          <ul>
            {ratings.map((r) => (
              <li key={r.name}>
                <Link
                  to={getFilterUrl({ rating: r.rating })}
                  className={`${r.rating}` === `${rating}` ? "active" : ""}
                >
                  <Rating caption={" & up"} rating={r.rating} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.lenght === 0 && (
                <MessageBox>
                  Search returned <strong>0</strong> results.
                </MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product} product={product} />
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
