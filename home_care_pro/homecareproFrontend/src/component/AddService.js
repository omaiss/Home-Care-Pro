import React, { Component } from 'react';
import { TextField, Button, Typography, Grid, MenuItem } from '@mui/material';
import Layout from './layout';

export default class AddService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            pricePerHour: '',
            status: 'active',
            serviceProvider: '',
            successMessage: '',
            errorMessage: ''
        };
    }

    componentDidMount() {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            this.setState({ serviceProvider: userData.id});
        }
      }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleAddService = async () => {

        const { title, description, pricePerHour, status, serviceProvider } = this.state;
        console.log(this.state);
        const dataToSend = {
            title,
            description,
            price_per_hour: parseFloat(pricePerHour),
            status,
            service_provider: parseInt(serviceProvider),
        };
        console.log(dataToSend);

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
                console.log(this.state);
                window.location.reload();
                window.alert('Service added successfully!')
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
            <div textAlign={'center'} margin={"0 auto"}>
                <Layout/>
                <Typography variant="h4" textAlign={'center'}>Add New Service</Typography>
                <Grid container spacing={2} textAlign={'center'} margin={"0 auto"} maxWidth={'720px'}>
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
