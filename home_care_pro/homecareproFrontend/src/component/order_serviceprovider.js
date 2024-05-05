import React, { Component } from 'react';
import { Typography, Grid, Box, Button, CircularProgress, Alert } from '@mui/material';
import Layout from './layout';

export default class AllOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      loading: true,
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.fetchAllJobs(); 
  }

  fetchAllJobs = async () => {
    fetch('/homecarepro/jobs/all_jobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch all jobs');
        }
      })
      .then((data) => {
        this.setState({ jobs: data, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching all jobs:', error);
        this.setState({
          errorMessage: 'An error occurred while fetching all jobs.',
          loading: false,
        });
      });
  };

  handleCompleteJob = (jobId) => {
    fetch(`/homecarepro/jobs/complete_job/${jobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to complete job');
        }
      })
      .then(() => {
        this.fetchAllJobs();
      })
      .catch((error) => {
        console.error('Error completing job:', error);
        this.setState({ errorMessage: 'Failed to complete the job. Please try again later.' });
      });
  };

  render() {
    const { jobs, loading, errorMessage } = this.state;

    return (
      <Box textAlign="center">
        <Layout />
        <Typography variant="h3" color="primary">
          All Orders
        </Typography>

        {loading ? (
          <CircularProgress /> 
        ) : errorMessage ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {jobs.map((job) => (
              <Grid item key={job.id} xs={12} md={6}>
                <Box border={1} borderRadius={2} padding={2}>
                  <Typography variant="h6">Job ID: {job.id}</Typography>
                  <Typography>Date: {job.date}</Typography>
                  <Typography>Start Time: {job.start_time}</Typography>
                  <Typography>End Time: {job.end_time}</Typography>
                  <Typography>Job Details: {job.job_details}</Typography>
                  <Typography>Status: {job.status}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleCompleteJob(job.id)}
                    disabled={job.status === 'completed'}
                  >
                    {job.status === 'completed' ? 'Completed' : 'Complete Job'}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  }
}
