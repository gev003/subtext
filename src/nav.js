import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  const navStyle = {
    color: "#fff",
    textDecoration: "none",
  };
  console.log(props);
  return (
    <nav>
      <div>
        <Link to="/" style={navStyle}>
          <h2>Logo Image</h2>
        </Link>
      </div>
      <ul>
        <Link to="/cart" style={navStyle}>
          <li>ItemLists</li>
        </Link>
      </ul>
    </nav>
  );
}
