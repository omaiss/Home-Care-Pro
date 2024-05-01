import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserInfo from "./userinfo";
import DeleteService from "./delete_service";

export default class HomePage extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/join" element={<DeleteService />} />
                </Routes>
            </Router>
        );
    }
}

function Home() {
    return <h1>This is the home page</h1>;
}
