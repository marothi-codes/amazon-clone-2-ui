import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };

  return (
    <form className="search" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <input
          type="search"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="primary">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
