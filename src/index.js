import React from "react";
import ReactDOM from "react-dom";
// Components
import App from "./App";

// Parent Stylesheet
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
