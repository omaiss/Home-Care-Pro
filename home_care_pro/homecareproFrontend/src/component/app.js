import React from "react";
import HomePage from "./home";
import { createRoot } from "react-dom/client";
import Layout from "./layout";
import DeleteService from "./delete_service";
import Login_Signup from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/login" element={<Login_Signup />} />
                    <Route path="/del_service" element={<DeleteService />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const appDiv = document.getElementById('app');
const root = createRoot(appDiv);
root.render(<App />);
