
import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import mcfries from "../../assets/Images/mcfries.jpg"
import Tangy  from "../../assets/Images/Tangy.jpg"
import { styled } from '@mui/material/styles';
import mustard  from "../../assets/Images/mustard.jpg"
import mayo  from "../../assets/Images/mayo.jpg"
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

  // Styled component for the card
const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
}));

  const addToCartBtnStyle = {
    backgroundColor: "#ffd93cf0 ",
    fontWeight: "900",
    color: " #26120fbd",
    padding: "10px 10px",
  }; 

  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
         <CustomCard>
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
</CustomCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Fries;

