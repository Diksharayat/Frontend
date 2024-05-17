import React from 'react';
import { Typography, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea sx={{ display: 'flex', flexGrow: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          // image={item.image}
          // alt={item.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {/* {item.name} */}ghjgj
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {/* Price: {item.price} */}ghfgh
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
          // onClick={() => removeFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      <Grid container spacing={2}>
        {/* {cartItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <CartItem item={item} removeFromCart={removeFromCart} />
          </Grid>
        ))} */}
      </Grid>
    </Box>
  );
};

export default Cart;

