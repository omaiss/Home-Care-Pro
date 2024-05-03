import React, { Component } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

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
        fetch('/homecarepro/services/view_services')
            .then(response => response.json())
            .then(data => this.setState({ services: data }))
            .catch(error => console.error('Error fetching services:', error));
    }

    handleDelete = () => {
        const { serviceId } = this.state;
        fetch(`homecarepro/services/delete_services/${serviceId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.setState({ deleteMessage: 'Service deleted successfully' });
                // Remove the deleted service from the list
                this.setState(prevState => ({
                    services: prevState.services.filter(service => service.id !== serviceId)
                }));
            } else {
                this.setState({ deleteMessage: data.error });
            }
        })
        .catch(error => console.error('Error deleting service:', error));
    };

    render() {
        const { services, serviceId, deleteMessage } = this.state;

        return (
            <div>
                <Typography variant="h4">Services</Typography>
                {services.map(service => (
                    <div key={service.id}>
                        <Typography variant="h6">{service.title}</Typography>
                        <Typography>{service.description}</Typography>
                        <Typography>{`Price per hour: ${service.price_per_hour}`}</Typography>
                        <Typography>{`Status: ${service.status}`}</Typography>
                        <Typography>{`Service Provider: ${service.service_provider}`}</Typography>
                        <hr />
                    </div>
                ))}
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField 
                            label="Enter Service ID to Delete" 
                            variant="outlined" 
                            value={serviceId} 
                            onChange={e => this.setState({ serviceId: e.target.value })}
                        />
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={this.handleDelete}
                        >
                            Delete Service
                        </Button>
                    </Grid>
                </Grid>
                {deleteMessage && <Typography>{deleteMessage}</Typography>}
            </div>
        );
    }
}