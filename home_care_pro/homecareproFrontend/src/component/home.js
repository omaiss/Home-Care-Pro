import Layout from "./layout";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Chatbot from "./chat";
import homecareproImage from '../../static/images/homecarepro.jpeg'; 

export default function HomePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    return (
        <div>
            <Layout />
            <Chatbot />
            <div>
                {userData && (
                    <Card sx={{margin: 'auto', marginTop: '20px', display:'flex', backgroundColor:"transparent", border:'none'}}>
                        <CardContent style={{padding: '20px'}}>
                            <Typography variant="h2" component="div" color="secondary" style={{marginBottom:'3%'}}>
                                Welcome {userData.full_name}
                            </Typography>
                            <Typography style={{marginBottom:'3%'}} variant="h5" color="primary" gutterBottom >
                                Email: {userData.email}
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom style={{marginBottom:'3%'}}>
                                User Type: {userData.user_type}
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom style={{marginBottom:'3%'}}>
                                Contact Number: {userData.contact_no}
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom style={{marginBottom:'3%'}}>
                                Location: {userData.location}
                            </Typography>
                        </CardContent>
                        <img src={homecareproImage} alt="Homecarepro" style={{ marginLeft:'35%', width:'600px', height:'700px'}} />
                    </Card>
                )}
            </div>
        </div>
    );
}
