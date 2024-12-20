import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Notification from "./notification";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const emptyStorage = (e) =>{
    localStorage.clear();
    console.clear();
  }

  return (
    <>
      <nav style={navStyles}>
        <ul style={ulStyles}>
          <li style={liStyles}>
            <Link to="/home" style={linkStyles}>Home</Link>
          </li>
          <li>
            <Link to='/updateUser' style={linkStyles}>Update Account</Link>
          </li>
          {userData && userData.user_type === "home owner" && (
            <>
            <li style={liStyles}>
              <Link to="/order_home_owner" style={linkStyles}>Order Now</Link>
            </li>
            <li style={liStyles}>
              <Link to="/current_orders" style={linkStyles}>Current Orders</Link>
            </li>
            <li style={liStyles}>
              <Link to="/search_service" style={linkStyles}>Search Services</Link>
            </li>
            <li style={liStyles}>
                <Link to="/feedback" style={linkStyles}>Feedback</Link>
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
              <li style={liStyles}>
                <Link to="/order_serviceprovider" style={linkStyles}>See Orders</Link>
              </li>
              <li style={liStyles}>
                <Link to="/feedback" style={linkStyles}>Feedback</Link>
              </li>
            </>
          )}
          <li style={liStyles}>
            <Link to='/home'>
              {userData && <span style={{ color: "#fff" }}>Welcome, {userData.username}</span>}
            </Link>
            <Link to="/" style={{ ...linkStyles, ...hoverStyles, ...loginStyles }} onClick={emptyStorage}>
              LogOut
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
