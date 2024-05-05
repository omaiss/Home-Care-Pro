import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import Layout from './layout';
import { useNavigate } from 'react-router-dom';

function OrderHomeowner()  {
  const [state, setState] = useState({
    homeownerId: '',
    serviceId: '',
    date: '',
    startTime: '',
    endTime: '',
    jobDetails: '',
    orderMessage: '',
    job: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData'); 
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setState(prevState => ({ ...prevState, homeownerId: userData.id })); 
    }
  }, []);

  const handleOrderService = async (e) => {
    e.preventDefault();
    const { serviceId, date, startTime, endTime, jobDetails, homeownerId } = state;
    const dataToSend = {
      homeowner: homeownerId, 
      service_provider: parseInt(serviceId), 
      date,
      start_time: startTime, 
      end_time: endTime, 
      job_details: jobDetails,
      status: 'pending', 
    };
    localStorage.setItem('serviceData', JSON.stringify(dataToSend));
    console.log(localStorage.getItem('serviceData'));
    const response = await fetch('/homecarepro/jobs/add_jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), 
    });
    const createdJob = await response.json();
    if (response.ok) {
      navigate('/payment');
    } else {
      window.alert('Error storing information, check information again!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const { serviceId, date, startTime, endTime, jobDetails, orderMessage, job } = state;

  return (
    <Box textAlign="center">
      <Layout />
      <Typography variant="h3" color="primary">
        Order a Service
      </Typography>

      <Grid container spacing={2} maxWidth={"720px"} margin={"0 auto"}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Service ID"
            variant="outlined"
            name="serviceId"
            value={serviceId}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Job Date"
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOrderService}
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
};

export default OrderHomeowner;
