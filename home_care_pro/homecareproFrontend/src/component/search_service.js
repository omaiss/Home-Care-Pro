import React, { Component } from 'react';
import { Typography, Grid, Box, Button, TextField, MenuItem } from '@mui/material';
import Layout from './layout';

export default class SearchService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      title: '',
      maxPrice: '',
      status: 'all',
      searchMessage: ''
    };
  }

  componentDidMount() {
    this.fetchAllServices();
  }

  fetchAllServices = async () => {
    try {
      const response = await fetch('/homecarepro/services/view_service', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ services: data });
      } else {
        console.error('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  handleSearch = async () => {
    const { title, maxPrice, status } = this.state;

    const queryParams = new URLSearchParams();
    if (title) queryParams.append('title', title);
    if (maxPrice) queryParams.append('max_price', maxPrice);
    if (status !== 'all') queryParams.append('status', status);

    try {
      const response = await fetch(`/homecarepro/services/search_service?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          services: data,
          searchMessage: data.length > 0 ? '' : 'No services found',
        });
      } else {
        this.setState({ searchMessage: 'Search failed, please try again.' });
      }
    } catch (error) {
      console.error('Error during search:', error);
      this.setState({ searchMessage: 'Error during search, please try again.' });
    }
  };

  render() {
    const { services, title, maxPrice, status, searchMessage } = this.state;

    return (
      <Box textAlign="center">
        <Layout />
        <Typography variant="h3" color="primary">
          Search Services
        </Typography>

        <Grid container spacing={2} margin={"0 auto"} maxWidth={"720px"}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Service Title"
              variant="outlined"
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Maximum Price Per Hour"
              variant="outlined"
              type="number"
              value={maxPrice}
              onChange={(e) => this.setState({ maxPrice: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Status"
              variant="outlined"
              select
              value={status}
              onChange={(e) => this.setState({ status: e.target.value })}
              fullWidth
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSearch}
          style={{ marginTop: '20px' }}
        >
          Search
        </Button>

        {services.length > 0 ? (
          services.map((service) => (
            <Box key={service.id} my={2}>
              <Typography variant="h6">ID: {service.id}</Typography>
              <Typography>{service.title}</Typography>
              <Typography>{service.description}</Typography>
              <Typography>{`Price per hour: ${service.price_per_hour}`}</Typography>
              <Typography>{`Status: ${service.status}`}</Typography>
              <hr />
            </Box>
          ))
        ) : (
          <Typography marginTop={"5%"} variant='h3'>No services found</Typography>
        )}
      </Box>
    );
  }
}
