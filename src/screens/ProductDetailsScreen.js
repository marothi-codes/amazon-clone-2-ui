import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import data from "../data";

export default function ProductDetailsScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);

  if (!product)
    return (
      <div>
        <h1>Product does not exist.</h1>
      </div>
    );

  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li>
              <strong>Price:</strong> ${product.price}
            </li>
            <li>
              <strong>Description:</strong> {product.description}
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">R{product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">Available</span>
                    ) : (
                      <span className="danger">Out of stock</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
