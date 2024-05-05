import React, { Component } from 'react';
import { Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import Layout from './layout';

export default class CurrentOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      loading: true, 
      errorMessage: '',
    };
  }

  componentDidMount() {
    const storedUserData = localStorage.getItem('userData');
    let homeownerId = null;
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      homeownerId = userData.id;
    }
  
    if (homeownerId) {
      this.fetchCurrentOrders(homeownerId);
    } else {
      this.setState({ loading: false, errorMessage: 'Could not determine homeowner ID' });
    }
  }
  

  fetchCurrentOrders = async (homeownerId) => {

    fetch(`/homecarepro/jobs/view_jobs/${homeownerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ orders: data, loading: false });
        })
        .catch((error) => {
          this.setState({ errorMessage: 'An error occurred while fetching orders.', loading: false });
    });
};
  

  render() {
    const { orders, loading, errorMessage } = this.state;

    return (
      <Box textAlign="center">
        <Layout />
        <Typography variant="h3" color="primary">
          Current Orders
        </Typography>

        {loading ? (
          <CircularProgress /> 
        ) : errorMessage ? (
          <Alert severity="error">{errorMessage}</Alert> 
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {orders.map((order) => (
              <Grid item key={order.id} xs={12} md={6}>
                <Box border={1} borderRadius={2} padding={2}>
                  <Typography variant="h6">Job ID: {order.id}</Typography>
                  <Typography>Date: {order.date}</Typography>
                  <Typography>Start Time: {order.start_time}</Typography>
                  <Typography>End Time: {order.end_time}</Typography>
                  <Typography>Job Details: {order.job_details}</Typography>
                  <Typography>Status: {order.status}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  }
}
