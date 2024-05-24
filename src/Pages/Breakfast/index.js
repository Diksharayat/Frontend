import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Egg from "../../assets/Images/Egg.jpg"
import fruit from "../../assets/Images/fruit.jpg"
import { styled } from '@mui/material/styles';
import burrito from "../../assets/Images/burrito.jpg"
import hotcakes from "../../assets/Images/hotcakes.jpg"
import EggMeal from "../../assets/Images/EggMeal.jpg"
import McGriddlesMeal from "../../assets/Images/McGriddlesMeal.jpg"
import axios from 'axios';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'Hotcakes and Sausage',
    description: 'Bacon, Egg  & Cheese Biscuit',
    price: '$19.99',
    image: hotcakes, 
  },
  {
    id: 2,
    name: 'Egg McMuffin®',
    description: 'Egg McMuffin®',
    price: '$29.99',
    image: Egg,
  },
  {
    id: 3,
    name: 'Fruit & Maple Oatmeal',
    description: 'Fruit & Maple Oatmeal',
    price: '$39.99',
    image: fruit,
  },
  {
    id: 4,
    name: 'Sausage Burrito Meal',
    description: 'Sausage Burrito Meal',
    price: '$49.99',
    image: burrito,
  },
  {
    id: 5,
    name: 'Sausage Biscuit with Egg Meal 5',
    description: 'Sausage Biscuit with Egg Meal',
    price: '$59.99',
    image: EggMeal,
  },
  {
    id: 6,
    name: 'Sausage McGriddles® Meal',
    description: 'Sausage McGriddles® Meal',
    price: '$69.99',
    image: McGriddlesMeal,
  },
];

const CartMapping = () => {

 
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

  const addToCart = async (product_id, name, description, price, image) => {
    try {
    
      const response = await axios.post('https://mcd-pi.vercel.app/api/add-to-cart', {
        product_id: product_id,
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
    <Grid container spacing={4}>
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

export default CartMapping;
