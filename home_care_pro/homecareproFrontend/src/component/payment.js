import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)({
  paddingTop: (theme) => theme.spacing(4),
  paddingBottom: (theme) => theme.spacing(4),
});

const StyledTitle = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
});

const StyledTextField = styled(TextField)({
  marginBottom: (theme) => theme.spacing(2),
});

const StyledButton = styled(Button)({
  marginTop: (theme) => theme.spacing(2),
});

export default function Payment() {
  const [paymentInfo, setPaymentInfo] = useState({
    payment_method: "card", 
    card_number: "",
    expiry_date: "",
    cvv: "",
  });

  const [userData, setUserData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
    }

    const storedServiceData = localStorage.getItem('serviceData');
    if (storedServiceData) {
      const serviceData = JSON.parse(storedServiceData);
      setServiceData(serviceData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    console.log(serviceData);
    const dataToSend = {
      user: userData.id,
      service: serviceData.service_provider,
      card_number: paymentInfo.card_number,
      cvv: paymentInfo.cvv,
      expiry_date: paymentInfo.expiry_date,
      payment_method: paymentInfo.payment_method
    };
    console.log(dataToSend);
    try {
      const response = await fetch("/homecarepro/payments/add_payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        window.location.reload();
        window.alert('Payment submitted successfully.');
        navigate('/home');
      } else {
        window.alert('Error storing payment information. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      window.alert('Error submitting payment. Please try again later.');
    }
  };  


  return (
    <div>
      <Layout />
    {userData && (
      <StyledContainer maxWidth="md">
        <StyledTitle variant="h2" style={{ marginTop: '5%' }}>
          Payment Information
        </StyledTitle>
        <Typography variant="h5" style={{ marginBottom: '5%' }}>
          Welcome, {userData.full_name} <br></br>
          Enter your payment information.
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '5%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Card Number"
                name="card_number"
                value={paymentInfo.card_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              name="expiry_date"
              type="date"
              value={paymentInfo.expiry_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  min: 'YYYY-MM',
                },
              }}
            />
            </Grid>
            <Grid item xs={6}>
              <StyledTextField
                fullWidth
                label="CVV"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <StyledButton style={{ marginTop: '5%' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Payment
          </StyledButton>
        </form>
      </StyledContainer>
    )}
    </div>
  );
}
