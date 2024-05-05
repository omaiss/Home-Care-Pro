import React, { useState } from 'react';
import { styled } from '@mui/system';
import Layout from './layout';


const Container = styled('div')({
    maxWidth: '600px',
    margin: '20px auto',
    background: '#f5f0ff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  });

const Title = styled('h1')({
  textAlign: 'center',
  color: '#A020F0', 
  marginBottom: '20px',
});

const Form = styled('form')({
  marginBottom: '20px',
});

const Input = styled('input')({
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxSizing: 'border-box',
  transition: 'box-shadow 0.3s ease',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.6)',
  },
});

const Textarea = styled('textarea')({
  width: '100%',
  padding: '12px',
  height: '120px',
  marginBottom: '20px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxSizing: 'border-box',
  transition: 'box-shadow 0.3s ease',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.6)',
  },
});

const Button = styled('button')({
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(to right, #A020F0, #8A2BE2)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(to right, #8A2BE2, #7B68EE)',
  },
});

const ReviewsList = styled('ul')({
  listStyleType: 'none',
  padding: '0',
});

const ReviewItem = styled('li')({
  marginBottom: '20px',
  padding: '20px',
  background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

const Strong = styled('strong')({
  fontWeight: 'bold',
});

function Feedback() {
  const serviceProviderData = {
    "12345": "Jhonny Plumber",
    "54321": "Jhonny Electrician"
  };

  const serviceProviderId = "12345";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [feedbackList, setFeedbackList] = useState([
    { serviceProviderId: "12345", name: "John Doe", email: "john@example.com", message: "Great service!" },
    { serviceProviderId: "54321", name: "Jane Smith", email: "jane@example.com", message: "Amazing experience!" },
    { serviceProviderId: "12345", name: "Alice Johnson", email: "alice@example.com", message: "Could be better." }

  ]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      ...formData,
      serviceProviderId: serviceProviderId
    };
    setFeedbackList([...feedbackList, newFeedback]);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
    <Layout />
    <Container className="container">
      <Title>Feedback</Title>
      <Form id="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="service-provider-name">Service Provider Name:</label>
        <Input type="text" id="service-provider-name" value={serviceProviderData[serviceProviderId]} readOnly />
        <label htmlFor="service-provider-id">Service Provider ID:</label>
        <Input type="text" id="service-provider-id" value={serviceProviderId} readOnly />
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Textarea
          id="message"
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        ></Textarea>
        <Button type="submit">Submit</Button>
      </Form>
      <h2>Reviews</h2>
      <ReviewsList id="feedback-list">
        {feedbackList.map((feedback, index) => (
          <ReviewItem key={index}>
            <Strong>{feedback.name}</Strong> ({feedback.email}): {feedback.message}
          </ReviewItem>
        ))}
      </ReviewsList>
    </Container>
    </div>
  );
}

export default Feedback;
