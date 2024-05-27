import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import mcAlloTikki from "../../assets/Images/mcAlloTikki.jpg"
import paneer from "../../assets/Images/paneer.jpg"
import hug from "../../assets/Images/hug.jpg"
import Quater from "../../assets/Images/Quater.jpg"
import { styled } from '@mui/material/styles';
import cheese from "../../assets/Images/cheese.jpg"
import Doublecheese from "../../assets/Images/Doublecheese.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

const products = [
  {
    id: 6,
    name: 'McAloo Tikki',
    description: 'McAloo Tikki',
    price: '$19.99',
    image: mcAlloTikki, 
  },
  {
    id: 7,
    name: 'McSpicy Paneer Burger',
    description: 'McSpicy Paneer Burger',
    price: '$29.99',
    image: paneer,
  },
  {
    id: 8,
    name: 'Veg Maharaja Mac Burger',
    description: 'Veg Maharaja Mac Burger',
    price: '$39.99',
    image: hug,
  },
  {
    id: 9,
    name: 'Quarter Pounder®* with Cheese Bacon',
    description: 'Quarter Pounder®* with Cheese Bacon',
    price: '$49.99',
    image: Quater,
  },
  {
    id: 10,
    name: 'Cheeseburger',
    description: 'Cheeseburger',
    price: '$59.99',
    image: cheese,
  },
  {
    id: 11,
    name: 'Double Cheese burger',
    description: 'Double Cheese burger',
    price: '$69.99',
    image: Doublecheese,
  },
];

const Burger = () => {
  
  
// Styled component for the card
const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  marginTop:"10px",
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
    backgroundColor: "#ffd93cf0",
    fontWeight: "900",
    color: "#26120fbd",
    padding: "10px 10px",
  };

  
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

  return (
    <div>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
            <CustomCard>
              <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h5" sx={{color:" #26120fbd",fontWeight:"bold"}} gutterBottom>
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
    </div>
  )
}

export default Burger;
