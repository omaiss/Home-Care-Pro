import React, { Component } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import Layout from './layout';

export default class OrderHomeowner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homeownerId: '',
      serviceId: '',
      date: '',
      startTime: '',
      endTime: '',
      jobDetails: '',
      orderMessage: '',
      job: null,
    };
  }

  componentDidMount() {
    const storedUserData = localStorage.getItem('userData'); 
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.setState({ homeownerId: userData.id }); 
    }
  }

  handleOrderService = async () => {
    const { serviceId, date, startTime, endTime, jobDetails, homeownerId } = this.state;

    const dataToSend = {
      homeowner: homeownerId, 
      service_provider: parseInt(serviceId), 
      date,
      start_time: startTime, 
      end_time: endTime, 
      job_details: jobDetails,
      status: 'pending', 
    };

    try {
      const response = await fetch('/homecarepro/jobs/add_jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), 
      });

      if (response.ok) {
        const createdJob = await response.json();
        this.setState({
          job: createdJob, 
          orderMessage: 'Service ordered successfully!',
          serviceId: '',
          date: '',
          startTime: '',
          endTime: '',
          jobDetails: '',
        });
      } else {
        const errorData = await response.json();
        this.setState({ orderMessage: `Error ordering service: ${errorData.detail || 'Please check the service ID (See from search tab)'}` });
      }
    } catch (error) {
      console.error('Error during order:', error);
      this.setState({ orderMessage: 'An error occurred while ordering service. Please try again.' });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { serviceId, date, startTime, endTime, jobDetails, orderMessage, job } = this.state;

    return (
      <Box textAlign="center">
        <Layout />
        <Typography variant="h3" color="primary">
          Order a Service
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              label="Service ID"
              variant="outlined"
              name="serviceId"
              value={serviceId}
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Job Date"
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Start Time"
              type="time"
              name="startTime"
              value={startTime}
              onChange={this.handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="End Time"
              type="time"
              name="endTime"
              value={endTime}
              onChange={this.handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Job Details"
              variant="outlined"
              name="jobDetails"
              value={jobDetails}
              onChange={this.handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOrderService}
            style={{ marginTop: '20px' }}
          >
            Order Service
          </Button>

          {orderMessage && (
            <Typography style={{ marginTop: '20px' }}>{orderMessage}</Typography>
          )}

          {job && (
            <Box>
              <Typography variant="h5">Job Details</Typography>
              <Typography>ID: {job.id}</Typography>
              <Typography>Date: {job.date}</Typography>
              <Typography>Start Time: {job.start_time}</Typography>
              <Typography>End Time: {job.end_time}</Typography>
              <Typography>Job Details: {job.job_details}</Typography>
              <Typography>Status: {job.status}</Typography>
            </Box>
          )}
        </Box>
    );
  }
}
