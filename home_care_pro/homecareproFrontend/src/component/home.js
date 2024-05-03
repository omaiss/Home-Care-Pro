import Layout from "./layout";
import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    return (
        <div>
            <Layout />
            <div className="user-profile">
                <h1>Welcome, {userData ? userData.username : 'Guest'}!</h1>
                {userData && (
                    <div>
                        <p>Email: {userData.email}</p>
                        <p>User Type: {userData.user_type}</p>
                        <p>Full Name: {userData.full_name}</p>
                        <p>Contact Number: {userData.contact_no}</p>
                        <p>Location: {userData.location}</p>
                    </div>
                )}
            </div>
        </div>
    );
}



/*<Route path="/layout" element={<Layout/>} >
<Route path="/home" element={<HomePage />} />
</Route>
*/