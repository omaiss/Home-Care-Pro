import { Outlet, Link } from "react-router-dom";
import React from "react";

const navStyles = {
  backgroundColor: "#333",
  overflow: "hidden",
};

const ulStyles = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
  overflow: "hidden",
};

const liStyles = {
  float: "left",
  marginleft:'10%',
};

const linkStyles = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px",
  padding: "14px 16px",
  textAlign: "center",
  transition: "background-color 0.3s",
  width: "100%",
};

const loginStyles = {
  float: "right",
};

const hoverStyles = {
  backgroundColor: "red",
};

const Layout = () => {
  return (
    <>
      <nav style={navStyles}>
        <ul style={ulStyles}>
          <li style={{ ...liStyles, ...loginStyles }}>
            <Link to="/" style={{ ...linkStyles, ...hoverStyles }}>Login/Signup</Link>
          </li>
          <li style={liStyles}>
            <Link to="/home" style={linkStyles}>Home</Link>
          </li>
          <li style={liStyles}>
            <Link to="/del_service" style={linkStyles}>Delete Service</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
