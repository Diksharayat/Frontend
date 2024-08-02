import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Typography as CardTypography, CardMedia, Grid, Modal, TextField } from '@mui/material';

const CustomCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
        cursor: "pointer",
    },
}));

const AddDishForm = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dishes, setDishes] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const [dishName, setDishName] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishPrice, setDishPrice] = useState('');

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/category`);
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }
                const data = await response.json();
                setMenuItems(data[0].categories);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const category = menuItems.find(cat => cat._id === selectedCategory);
            if (category) {
                setDishes(category.dishes);
            } else {
                setDishes([]);
            }
        }
    }, [selectedCategory, menuItems]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Category:', selectedCategory);
    };

    const handleOpenEditModal = (dish) => {
        setSelectedDish(dish);
        setDishName(dish.name);
        setDishDescription(dish.description);
        setDishPrice(dish.price);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedDish(null);
    };

    const handleSaveChanges = () => {
        // Implement save changes logic here
        console.log('Updated Dish:', { dishName, dishDescription, dishPrice });
        handleCloseEditModal();
    };

    const deleteDish = async (categoryId, dishId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/dish/${categoryId}/${dishId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete dish');
            }

            const data = await response.json();
            console.log(data.message);  // Optionally log the response message
            return true;
        } catch (error) {
            console.error('Error deleting dish:', error);
            return false;
        }
    };

    const handleDeleteDish = async (dishId) => {
        if (selectedCategory) {
            const success = await deleteDish(selectedCategory, dishId);
            if (success) {
                // Update local state to reflect deletion
                setDishes(dishes.filter(dish => dish._id !== dishId));
            } else {
                // Handle error appropriately (e.g., show an error message to the user)
                alert('Failed to delete the dish.');
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Add Dish
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            required
                            name="category"
                        >
                            {menuItems.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Add Dish
                    </Button>
                </form>
                {selectedCategory && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Dishes
                        </Typography>
                        <Grid container spacing={2}>
                            {dishes.length > 0 ? (
                                dishes.map((dish) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={4}
                                        key={dish._id}
                                        style={{ marginBottom: "20px" }}
                                    >
                                        <CustomCard>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={dish.image}
                                                alt={dish.name}
                                            />
                                            <CardContent>
                                                <CardTypography variant="h6">
                                                    {dish.name}
                                                </CardTypography>
                                                <CardTypography color="textSecondary">
                                                    {dish.description}
                                                </CardTypography>
                                                <CardTypography color="textPrimary">
                                                    {dish.price}
                                                </CardTypography>
                                                <Grid
                                                    container
                                                    style={{
                                                        display: 'flex',
                                                        gap: '25px',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleOpenEditModal(dish)}
                                                        style={{
                                                            backgroundColor: "#FFA500",
                                                            fontWeight: "900",
                                                            color: "white",
                                                            padding: "10px 20px",
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleDeleteDish(dish._id)}
                                                        style={{
                                                            backgroundColor: "red",
                                                            fontWeight: "900",
                                                            color: "white",
                                                            padding: "10px 20px",
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Grid>
                                            </CardContent>
                                        </CustomCard>
                                    </Grid>
                                ))
                            ) : (
                                <Typography>No dishes available for this category.</Typography>
                            )}
                        </Grid>
                    </Box>
                )}
            </Box>

            {/* Edit Modal */}
            <Modal
                open={editModalOpen}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-dish-modal-title"
                aria-describedby="edit-dish-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="edit-dish-modal-title" variant="h6" component="h2">
                        Edit Dish
                    </Typography>
                    <TextField
                        label="Name"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Description"
                        value={dishDescription}
                        onChange={(e) => setDishDescription(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Price"
                        value={dishPrice}
                        onChange={(e) => setDishPrice(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseEditModal} variant="outlined" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges} variant="contained">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default AddDishForm;
