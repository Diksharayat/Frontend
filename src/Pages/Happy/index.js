import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import happyHam from "../../assets/Images/happyHam.jpg"
import happyhug from "../../assets/Images/happyhug.jpg"
import happymeal2 from "../../assets/Images/happymeal2.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'Hamburger Happy Meal® ',
    description: 'Hamburger Happy Meal®',
    price: '$19.99',
    image: happyHam, 
  },
  {
    id: 2,
    name: ' 6 Piece Chicken McNuggets® Happy Meal®',
    description: '6 Piece Chicken McNuggets® Happy Meal®',
    price: '$29.99',
    image: happyhug,
  },
  {
    id: 3,
    name: '4 Piece Chicken McNuggets® Happy Meal®uct 3',
    description: '4 Piece Chicken McNuggets® Happy Meal®',
    price: '$39.99',
    image: happymeal2,
  },
]

const HappyMeal = () => {
  
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  const addToCartBtnStyle = {
    backgroundColor: "#ffd93cf0 ",
    fontWeight: "900",
    color:" #26120fbd",
    padding: "10px 0px",
  };

 
  const addToCart = async (productId, name, description, price, image) => {
    try {
    
      const response = await axios.post('https://mcd-pi.vercel.app/add-to-cart', {
        product_id: productId,
        name: name,
        description: description,
        price: price,
        image: image
      });
      toast.success("Item added to the cart");
      console.log(response.data); 
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  return (
    <div>
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
          <Card style={cardStyle}>
            <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="body1">
                Price: {product.price}
              </Typography>
            </CardContent>
            <Button variant="contained" style={addToCartBtnStyle} onClick={() => addToCart(product.id, product.name, product.description, product.price, product.image)}>
  Add to Cart
</Button>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  )
}

export default HappyMeal;
