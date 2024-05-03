import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login_Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [user_type, setUsertype] = useState("");
    const [full_name, setFullname] = useState("");
    const [contact_no, setContactno] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
        if (name === 'email') setEmail(value);
        if (name === 'contact_no') setContactno(value);
        if (name === 'user_type') setUsertype(value);
        if (name === 'location') setLocation(value);
        if (name === 'full_name') setFullname(value);
    };


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/homecarepro/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email, contact_no, user_type, location, full_name }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/home");
            } else {
                window.alert('Error storing information, check information again!')
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/homecarepro/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(username + password);
                navigate("/home");
            } else {
                window.alert('Error storing information, check information again!')
            }
        } catch (error) {
                console.log(username + password);
                console.error("Error logging in:", error);
        }
    };


    useEffect(() => {
        const container = document.getElementById("container");
        const registerBtn = document.getElementById("register");
        const loginBtn = document.getElementById("login");

        registerBtn.addEventListener("click", () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener("click", () => {
            container.classList.remove("active");
        });
    }, []);

    return (
        <div className="body_class">
            <div className="container" id="container">
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <i className="fa-brands fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            name="username"
                            onChange={handleChange}
                            type="text"
                            placeholder="Username"
                            value={username}
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            value={password}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={email}
                            name="email"
                        />
                        <input
                            name="full_name"
                            type="text"
                            placeholder="Full Name"
                            onChange={handleChange}
                            value={full_name}
                        />
                        <input
                            name="contact_no"
                            type="text"
                            onChange={handleChange}
                            value={contact_no}
                            placeholder="Contact Number"
                        />
                        <input
                            name="location"
                            type="text"
                            placeholder="Location City" 
                            onChange={handleChange}
                            value={location}
                        />
                          <div style={{ display: "flex" }}>
                            <label style={{ marginRight: "20px" }}>
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="home owner"
                                    onChange={handleChange}
                                />{" "}
                                Home Owner
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="user_type"
                                    value="service provider"
                                    onChange={handleChange}
                                />{" "}
                                Service Provider
                            </label>
                        </div>
                        <button onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <i className="fa-brands fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email password</span>
                        <input
                            name="username"
                            onChange={handleChange}
                            type="text"
                            placeholder="Username"
                            value={username}
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            value={password}
                        />
                        <a href="#">Forgot Your Password?</a>
                        <button type="submit" onClick={handleLogin}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                Enter your personal details to use all of site
                                features
                            </p>
                            <button className="hidden" id="login">
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Register with your personal details to use all
                                of site features
                            </p>
                            <button className="hidden" id="register">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login_Signup;
