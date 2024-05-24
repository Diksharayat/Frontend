
import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import bacon1 from "../../assets/Images/bacon1.jpg"
import Egg from "../../assets/Images/Egg.jpg"
import fruit from "../../assets/Images/fruit.jpg"
import burrito from "../../assets/Images/burrito.jpg"
import hotcakes from "../../assets/Images/hotcakes.jpg"
import EggMeal from "../../assets/Images/EggMeal.jpg"
import McGriddlesMeal from "../../assets/Images/McGriddlesMeal.jpg"
import mcfries from "../../assets/Images/mcfries.jpg"
import Tangy  from "../../assets/Images/Tangy.jpg"
import mustard  from "../../assets/Images/mustard.jpg"
import mayo  from "../../assets/Images/mayo.jpg"
import ketch  from "../../assets/Images/ketch.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

const products = [
  {
    id: 12,
    name: 'World Famous Fries®',
    description: 'World Famous Fries®',
    price: '$19.99',
    image:mcfries , 
  },
  {
    id: 13,
    name: 'Tangy Barbeque Sauce',
    description: 'Tangy Barbeque Sauce',
    price: '$29.99',
    image:Tangy,
  },
  {
    id: 14,
    name: 'Honey Mustard Sauce',
    description: 'Honey Mustard Sauce',
    price: '$39.99',
    image: mustard,
  },
  {
    id: 15,
    name: 'Mayonnaise Packet',
    description: 'Mayonnaise Packet',
    price: '$49.99',
    image: mayo,
  },
  
];


const addToCart = async (productId, name, description, price, image) => {
  try {
  
    const response = await axios.post('https://mcd-pi.vercel.app/api/add-to-cart', {
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


const Fries = () => {

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
  );
};

export default Fries;

