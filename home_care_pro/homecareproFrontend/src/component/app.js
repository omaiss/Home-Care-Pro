import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './home'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            istrue: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ istrue: true });
    }

    render() {
        const { isLoggedin } = this.state;
        if(this.state.istrue){
            return (<div> <HomePage /></div>);
        }
        return <div className="container" id="container">
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
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={this.handleSubmit}>
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
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login">Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="hidden" id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);
