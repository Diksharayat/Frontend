import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const AddDishForm = () => {
    const [dish, setDish] = useState({
        _id: '66601607b904ad100a52c8e5',
        id: '5',
        name: 'Sausage Biscuit with Egg Meal 5',
        description: 'Sausage Biscuit with Egg Meal',
        price: '$59.99',
        image: null, // will hold the image file
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDish({ ...dish, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setDish({ ...dish, image: file });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, including image upload
        console.log(dish); // Replace with actual submission logic
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Add Dish
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="ID"
                        name="_id"
                        value={dish._id}
                        onChange={handleInputChange}
                        disabled
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Category ID"
                        name="id"
                        value={dish.id}
                        onChange={handleInputChange}
                        disabled
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={dish.name}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={dish.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={dish.price}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        required
                        style={{ marginBottom: '16px' }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Dish
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddDishForm;
