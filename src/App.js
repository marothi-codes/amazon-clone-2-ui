import React from "react";
import { Link } from "react-router-dom";
import data from "./data";

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazon
          </Link>
        </div>
        <div>
          <Link to="/cart">Cart</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
            {data.products.map((product, idx) => (
              <div key={idx} className="card">
                <Link to={`/product/${product._id}`}>
                  <img
                    className="medium"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                  <div className="rating">
                    <span>
                      <i
                        className={
                          product.rating >= 1
                            ? "fa fa-star"
                            : product.rating >= 0.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                        }
                      ></i>
                    </span>
                    <span>
                      <i
                        className={
                          product.rating >= 2
                            ? "fa fa-star"
                            : product.rating >= 1.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                        }
                      ></i>
                    </span>
                    <span>
                      <i
                        className={
                          product.rating >= 3
                            ? "fa fa-star"
                            : product.rating >= 2.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                        }
                      ></i>
                    </span>
                    <span>
                      <i
                        className={
                          product.rating >= 4
                            ? "fa fa-star"
                            : product.rating >= 3.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                        }
                      ></i>
                    </span>
                    <span>
                      <i
                        className={
                          product.rating >= 5
                            ? "fa fa-star"
                            : product.rating >= 4.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                        }
                      ></i>
                    </span>
                    {<span>{product.numReviews + " reviews"}</span>}
                  </div>
                  <div className="price">R{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>
  );
}

export default App;
