import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInfo from "./userinfo";

export default class HomePage extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/join" element={<UserInfo />} />
                </Routes>
            </Router>
        );
    }
}

function Home() {
    return <h1>This is the home page</h1>;
}
