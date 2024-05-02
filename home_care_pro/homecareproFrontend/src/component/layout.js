import { Outlet, Link } from "react-router-dom";
import React from "react";


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/del_service">Delete Service</Link>
          </li>
          <li>
            <Link to="/login">Login/Signup</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;