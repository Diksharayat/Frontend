import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import mcAlloTikki from "../../assets/Images/mcAlloTikki.jpg"
import Chic from "../../assets/Images/chic.jpg"
import Filet from "../../assets/Images/Filet.jpg"
import spicy from "../../assets/Images/spicy.jpg"
import mccrispy from "../../assets/Images/mccrispy.jpg"
import cheese from "../../assets/Images/cheese.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'Bacon Cajun Ranch McCrispy™',
    description: 'Bacon Cajun Ranch McCrispy™',
    price: '$19.99',
    image:mcAlloTikki, 
  },
  {
    id: 2,
    name: 'McChicken® ',
    description: 'McChicken®',
    price: '$29.99',
    image: Chic,
  },
  {
    id: 3,
    name: 'Filet-O-Fish® ',
    description: 'Filet-O-Fish®',
    price: '$39.99',
    image: Filet,
  },
  {
    id: 4,
    name: 'Spicy Deluxe McCrispy™ ',
    description: 'Spicy Deluxe McCrispy',
    price: '$49.99',
    image: spicy,
  },
  {
    id: 5,
    name: 'Spicy McCrispy™',
    description: 'Spicy McCrispy™',
    price: '$59.99',
    image: mccrispy,
  },
  {
    id: 6,
    name: 'Bacon Cajun Ranch Deluxe McCrispy™ ',
    description: 'Bacon Cajun Ranch Deluxe McCrispy™',
    price: '$69.99',
    image: cheese,
  },
];

const addToCart = async (productId, name, description, price, image) => {
  try {
  
    const response = await axios.post('http://localhost:10000/api/add-to-cart', {
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

const Sandwiches = () => {
  
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

export default Sandwiches;
