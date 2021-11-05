import React from "react";
import { Link } from "react-router-dom";
import Product from "./components/Product";
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
              <Product key={idx} product={product} />
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">
        Copyright &copy; Marothi Codes Inc. {new Date().getFullYear()} | All
        Rights Reserved
      </footer>
    </div>
  );
}

export default App;
