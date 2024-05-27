import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import nuggets from "../../assets/Images/nuggets.jpg"
import nugMeal from "../../assets/Images/nugMeal.jpg"
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const products = [
  {
    id: 19,
    name: 'Chicken McNuggets® ',
    description: 'Chicken McNuggets®',
    price: '$19.99',
    image: nuggets, 
  },
  {
    id: 20,
    name: '10 Piece Chicken McNuggets® ',
    description: '10 Piece Chicken McNuggets®',
    price: '$29.99',
    image: nugMeal,
  },
]


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


 
const McNuggets = () => {
  
 
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

export default McNuggets;
