import React from "react";
import data from "../data";

// Components
import Product from "../components/Product";

export default function HomeScreen() {
  return (
    <div>
      <div className="row center">
        {data.products.map((product, idx) => (
          <Product key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
