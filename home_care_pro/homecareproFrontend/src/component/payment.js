import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Layout from "./layout";

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

  useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
      }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle payment submission
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
              <StyledTextField
                fullWidth
                label="Expiry Date"
                name="expiry_date"
                value={paymentInfo.expiry_date}
                onChange={handleChange}
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
