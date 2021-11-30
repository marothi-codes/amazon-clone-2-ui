import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../redux/actions/productActions";

// Component Imports.
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function SearchScreen(props) {
  const { name = "all", category = "all" } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    error: errorLoadingCategories,
    loading: loadingCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
      })
    );
  }, [dispatch, name, category]);

  const getFilterUrl = (filter) => {
    const categoryFilter = filter.category || category;
    const nameFilter = filter.name || name;
    return `/search/category/${categoryFilter}/name/${nameFilter}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
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
              {categories.map((c) => (
                <li key={c}>
                  <Link to={getFilterUrl({ category: c })}>{c}</Link>
                </li>
              ))}
            </ul>
          )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
