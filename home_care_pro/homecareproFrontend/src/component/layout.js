import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Notification from "./notification";

const navStyles = {
  backgroundColor: "#333",
  overflow: "hidden",
};

const ulStyles = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
  overflow: "hidden",
  display: "flex", 
  alignItems: "center",
};

const liStyles = {
  marginLeft: "10px", 
};

const linkStyles = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px",
  padding: "14px 16px",
  textAlign: "center",
  transition: "background-color 0.3s",
};

const loginStyles = {
  marginLeft: "auto", // Pushes the login/signup link to the right
  marginRight: "10px", // Adds margin to the right for spacing
};

const hoverStyles = {
  backgroundColor: "red",
};

const Layout = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const emptyStorage = (e) =>{
    localStorage.clear();
  }

  return (
    <>
      <nav style={navStyles}>
        <ul style={ulStyles}>
          <li style={liStyles}>
            <Link to="/home" style={linkStyles}>Home</Link>
          </li>
          {userData && userData.user_type === "home owner" && (
            <>
          <li>
            <Link to='/updateUser' style={linkStyles}>Update Account</Link>
          </li>
          </>
          )}
          {userData && userData.user_type === "service provider" && (
            <>
              <li style={liStyles}>
                <Link to="/add_service" style={linkStyles}>Add Service</Link>
              </li>
              <li style={liStyles}>
                <Link to="/del_service" style={linkStyles}>Delete Service</Link>
              </li>
            </>
          )}
          <li style={liStyles}>
            <Link to='/home'>
              {userData && <span style={{ color: "#fff" }}>Welcome, {userData.username}</span>}
            </Link>
            <Link to="/" style={{ ...linkStyles, ...hoverStyles, ...loginStyles }} onClick={emptyStorage}>
              Login/Signup
            </Link>
          </li>
          <li style={{ ...linkStyles}}> 
            <Notification/>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
