import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TextField from "@mui/material";
import FormHelperText from "@mui/material";
import FormControl from "@mui/material";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
import FormControlLabel from "@mui/material";
import HomePage from "./home";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Hello! to the info page.</h1>;
    }
}

