import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

// Components
import Product from "../components/Product";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product, idx) => (
            <Product key={idx} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
