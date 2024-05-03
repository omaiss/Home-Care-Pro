import React, { Component } from 'react';
import { TextField, Button, Typography, Grid, MenuItem } from '@mui/material';

export default class AddService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            pricePerHour: '',
            status: 'active',
            successMessage: '',
            errorMessage: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleAddService = async () => {
        const { title, description, pricePerHour, status, serviceProvider } = this.state;
    
        const dataToSend = {
            title,
            description,
            price_per_hour: parseFloat(pricePerHour),
            status,
            service_provider: parseInt(serviceProvider),
        };
    
        try {
            const response = await fetch('/homecarepro/services/add_service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                this.setState({
                    successMessage: 'Service added successfully!',
                    errorMessage: '',
                    title: '',
                    description: '',
                    pricePerHour: '',
                    status: 'active',
                    serviceProvider: '',
                });
            } else {
                this.setState({ errorMessage: data.error || 'Failed to add service', successMessage: '' });
            }
        } catch (error) {
            console.error('Error during POST:', error);
            this.setState({ errorMessage: 'An error occurred while adding the service', successMessage: '' });
        }
    };
    

    render() {
        const { title, description, pricePerHour, status, successMessage, errorMessage } = this.state;

        return (
            <div>
                <Typography variant="h4">Add New Service</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                            multiline
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price Per Hour"
                            variant="outlined"
                            name="pricePerHour"
                            value={pricePerHour}
                            onChange={this.handleChange}
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            name="status"
                            value={status}
                            onChange={this.handleChange}
                            select
                            fullWidth
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleAddService}
                        >
                            Add Service
                        </Button>
                    </Grid>
                </Grid>

                {successMessage && <Typography color="primary">{successMessage}</Typography>}
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            </div>
        );
    }
}
