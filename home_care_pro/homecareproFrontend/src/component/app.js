import React from "react";
import HomePage from "./home";
import { createRoot } from "react-dom/client";
import DeleteService from "./delete_service";
import Login_Signup from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./payment";
import AddService from "./AddService";
import Chatbot from "./chat";
import UpdateAccount from "./updateUser";
import SearchService from "./search_service";
import OrderHomeowner from "./order_homeowner";
import CurrentOrders from "./current_orders";


export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login_Signup />} /> 
                <Route path="/home" element={<HomePage />} />
                <Route path="/del_service" element={<DeleteService />} />
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/add_service" element={<AddService/>}/>
                <Route path="/chat" element= {<Chatbot/>}/>
                <Route path='/updateUser' element={<UpdateAccount />} />
                <Route path='/search_service' element={<SearchService />} />
                <Route path='/order_home_owner' element={<OrderHomeowner />} />
                <Route path='/current_orders' element={<CurrentOrders />} />
            </Routes>
        </BrowserRouter>
    );
}
const appDiv = document.getElementById('app');
const root = createRoot(appDiv);
root.render(<App />);   