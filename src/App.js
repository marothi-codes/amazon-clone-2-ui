import { Link } from "react-router-dom";

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
            <div className="card">
              <Link to="product">
                <img className="medium" src="./images/p1.jpg" alt="product" />
              </Link>
              <div className="card-body">
                <Link to="product">
                  <h2>Nike Slim Shirts</h2>
                </Link>
                <div className="rating">
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                </div>
                <div className="price">$120</div>
              </div>
            </div>
            <div className="card">
              <Link to="product">
                <img className="medium" src="./images/p1.jpg" alt="product" />
              </Link>
              <div className="card-body">
                <Link to="product">
                  <h2>Nike Slim Shirts</h2>
                </Link>
                <div className="rating">
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                </div>
                <div className="price">$120</div>
              </div>
            </div>
            <div className="card">
              <Link to="product">
                <img className="medium" src="./images/p1.jpg" alt="product" />
              </Link>
              <div className="card-body">
                <Link to="product">
                  <h2>Nike Slim Shirts</h2>
                </Link>
                <div className="rating">
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                </div>
                <div className="price">$120</div>
              </div>
            </div>
            <div className="card">
              <Link to="product">
                <img className="medium" src="./images/p1.jpg" alt="product" />
              </Link>
              <div className="card-body">
                <Link to="product">
                  <h2>Nike Slim Shirts</h2>
                </Link>
                <div className="rating">
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                </div>
                <div className="price">$120</div>
              </div>
            </div>
            <div className="card">
              <Link to="product">
                <img className="medium" src="./images/p1.jpg" alt="product" />
              </Link>
              <div className="card-body">
                <Link to="product">
                  <h2>Nike Slim Shirts</h2>
                </Link>
                <div className="rating">
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                </div>
                <div className="price">$120</div>
              </div>
            </div>
            <div className="card">
              <Link to="product">
                <img className="medium" src="./images/p1.jpg" alt="product" />
              </Link>
              <div className="card-body">
                <Link to="product">
                  <h2>Nike Slim Shirts</h2>
                </Link>
                <div className="rating">
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                  </span>
                  <span>
                    {" "}
                    <i className="fa fa-star-half-o"></i>{" "}
                  </span>
                </div>
                <div className="price">$120</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>
  );
}

export default App;
