import React, { useState, useEffect } from 'react';
import Layout from './layout';

const UpdateAccount = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    user_type: '',
    full_name: '',
    contact_no: '',
    location: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserData(userData);
        }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        id: userData.id,
        username: formData.username || userData.username, 
        password: formData.password || userData.password,
        email: formData.email || userData.email,
        user_type: formData.user_type || userData.user_type,
        full_name: formData.full_name || userData.full_name,
        contact_no: formData.contact_no || userData.contact_no,
        location: formData.location || userData.location,
      };
  
      console.log(updatedData);
  
      const response = await fetch('/homecarepro/update_account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(updatedData));
        window.alert('User updated successfully');
        window.location.reload(); 
      } else {
        console.error('Error updating account:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };
  
  
  return (
    <div margin={"0 auto"}>
      <style>
        {`
          .user-details {
            margin: 0 auto;
            margin-bottom: 20px;
            margin-top: 20px;
            padding: 20px;
            color: black;
            text-align: center;
          }

          .user-details p {
            margin: 0;
          }

          .update-account-form {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #7fb7b6;
          }

          .update-account-form label {
            display: block;
            margin-bottom: 10px;
          }

          .update-account-form input {
            width: 100%;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 12px;
            border-radius: 4px;
            border: 1px solid #ccc;
          }

          .update-account-form button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .update-account-form button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <Layout />
      {userData && (
        <div className="user-details">
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>User Type: {userData.user_type}</p>
          <p>Full Name: {userData.full_name}</p>
          <p>Contact Number: {userData.contact_no}</p>
          <p>Location: {userData.location}</p>
        </div>
      )}
      <div className="update-account-form">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Full Name:
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          </label>
          <label>
            Contact Number:
            <input type="text" name="contact_no" value={formData.contact_no} onChange={handleChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
          <button type="submit">Update Account</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;
