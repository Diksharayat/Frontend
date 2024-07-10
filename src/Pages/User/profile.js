import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from API based on user ID
    const fetchUserData = async () => {
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`);
        const userData = response.data.user;
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          birthday: userData.birthday || '',
          gender: userData.gender || '',
          email: userData.email || '',
          contact: userData.contact || '',
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zip: userData.zip || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/update-profile`, formData);
      console.log(response.data); // Assuming your API returns a success message or updated user data
      toast.success("Profile updated successfully");
      navigate("/breakfast");
      // Optionally, handle success message or update local state after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
      // Optionally, handle error state or show error message to the user
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{color:"rgb(154 3 31 / 88%)"}}>
        USER PROFILE
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              label="First Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              label="Last Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              label="Birthday"
              placeholder="mm/dd/yyyy"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              placeholder="name@company.com"
              required
              disabled // Disable editing email field
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              label="contact"
              placeholder="+12-345 678 910"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              placeholder="Enter your home address"
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              label="State"
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              label="ZIP"
              required
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            variant="contained"
            size="large"
            type="submit"
            style={{ backgroundColor: "#9a031fe0", color: "#FFF" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserProfileForm;
