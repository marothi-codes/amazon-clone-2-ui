import React from "react";

export default function MessageBox(props) {
  const { variant } = props;
  return (
    <div className={`alert alert-${variant || "info"}`}>{props.children}</div>
  );
}
