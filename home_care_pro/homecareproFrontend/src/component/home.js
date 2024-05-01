import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Switch, Link, redirect } from "react-router-dom";
import UserInfo from "./userinfo";

export default class HomePage extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                    <p>This is the home page</p>
                    </Route>

                    <Route path="/join" element={Home} />
                    <Route path="/home" Component={UserInfo} />
                
                </Switch>
            </Router>
        );
    }
}

function Home() {
    return <h1>This is the home page</h1>; 
}
