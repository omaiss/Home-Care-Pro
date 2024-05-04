import React, { Component } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import Layout from './layout';

export default class DeleteService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            serviceId: '',
            deleteMessage: ''
        };
    }

    componentDidMount() {
        this.fetchServices();
    }

    fetchServices = () => {
        fetch('/homecarepro/services/view_service')
            .then(response => response.json())
            .then(data => this.setState({ services: data }))
            .catch(error => console.error('Error fetching services:', error));
    }

    handleDelete = () => {
        const { serviceId } = this.state;
        fetch(`/homecarepro/services/delete_service/${serviceId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.setState({ deleteMessage: 'Service deleted successfully' });
                window.location.reload();
            } else {
                this.setState({ deleteMessage: data.error });
            }
        })
        .catch(error => console.error('Error deleting service:', error));
    };

    render() {
        const { services, serviceId, deleteMessage } = this.state;

        return (
            <Box textAlign="center">
                <Layout/>
                <Typography variant="h3" color="primary" >Services</Typography>
                {services.length === 0 ? (
                    <Typography variant="h5" style={{marginTop:'20px', color:'red'}}>No services found<br></br>
                    Go to Add_Service to create new services
                    </Typography>
                ) : (
                    services.map(service => (
                        <Box key={service.id} my={2}>
                            <Typography variant="h6">ID: {service.id}</Typography>
                            <Typography variant="h6">{service.title}</Typography>
                            <Typography>{service.description}</Typography>
                            <Typography>{`Price per hour: ${service.price_per_hour}`}</Typography>
                            <Typography>{`Status: ${service.status}`}</Typography>
                            <Typography>{`Service Provider: ${service.service_provider}`}</Typography>                            
                            <hr />
                        </Box>
                    ))
                )}
                <TextField 
                    style={{marginTop:'20px'}}
                    label="Enter Service ID to Delete" 
                    variant="outlined" 
                    value={serviceId} 
                    onChange={e => this.setState({ serviceId: e.target.value })}
                />
                <br></br>
                <Button 
                    style={{marginTop:'20px'}}
                    variant="contained" 
                    color="primary" 
                    onClick={this.handleDelete}
                >
                    Delete Service
                </Button>
                {deleteMessage && <Typography>{deleteMessage}</Typography>}
            </Box>
        );
    }
}
