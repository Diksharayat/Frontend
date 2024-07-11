import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Box
} from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    uname: '',
    lastName: '',
    email: '',
    contact: '',
    tastedDishes: '',
    otherTastes: '',
    request: ''
  });

  const navigate=useNavigate();

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
          uname: userData.uname || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          contact: userData.contact || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Define your API endpoint
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/contact`; // Replace with your actual API URL

      // Make a POST request with fetch
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      // Optionally reset form fields or show success message
      // Clear form fields after successful submission
      setFormData({
        uname: '',
        lastName: '',
        email: '',
        contact: '',
        tastedDishes: '',
        otherTastes: '',
        request: ''
      });

      toast.success("Thank you for reaching out to us ");
      navigate("/breakfast");
     

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, show error message to user, etc.
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "rgb(154 3 31 / 88%)", textDecoration: "uppercase" }}>
        CONTACT FORM
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="firstName"
              value={formData.uname}
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              placeholder="name@company.com"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
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
            <FormControl fullWidth>
              <InputLabel>Tasted our dishes?</InputLabel>
              <Select
                value={formData.tastedDishes}
                onChange={handleChange}
                name="tastedDishes"
                label="tastedDishes"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.tastedDishes === 'Other' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Other tastes"
                name="otherTastes"
                value={formData.otherTastes}
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="What can we do for you?"
              name="request"
              value={formData.request}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              style={{ backgroundColor: "#9a031fe0", color: "#FFF" }}
            >
              Submit Form
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactForm;
