import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import mcAlloTikki from "../../assets/Images/mcAlloTikki.jpg"
import paneer from "../../assets/Images/paneer.jpg"
import hug from "../../assets/Images/hug.jpg"
import Quater from "../../assets/Images/Quater.jpg"
import cheese from "../../assets/Images/cheese.jpg"
import Doublecheese from "../../assets/Images/Doublecheese.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'McAloo Tikki',
    description: 'McAloo Tikki',
    price: '$19.99',
    image: mcAlloTikki, 
  },
  {
    id: 2,
    name: 'McSpicy Paneer Burger',
    description: 'McSpicy Paneer Burger',
    price: '$29.99',
    image: paneer,
  },
  {
    id: 3,
    name: 'Veg Maharaja Mac Burger',
    description: 'Veg Maharaja Mac Burger',
    price: '$39.99',
    image: hug,
  },
  {
    id: 4,
    name: 'Quarter Pounder®* with Cheese Bacon',
    description: 'Quarter Pounder®* with Cheese Bacon',
    price: '$49.99',
    image: Quater,
  },
  {
    id: 5,
    name: 'Cheeseburger',
    description: 'Cheeseburger',
    price: '$59.99',
    image: cheese,
  },
  {
    id: 6,
    name: 'Double Cheese burger',
    description: 'Double Cheese burger',
    price: '$69.99',
    image: Doublecheese,
  },
];

const Burger = () => {
  
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
    backgroundColor: "#ffd93cf0",
    fontWeight: "900",
    color: "#26120fbd",
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

export default Burger;
