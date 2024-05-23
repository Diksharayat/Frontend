import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, IconButton, Button } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://mcd-pi.vercel.app/api/cart');
        setCartItems(response.data.data); // Assuming the API response includes an array of cart items with image URL
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (product_id) => {
    try {
      await axios.post('http://localhost:10000/api/cart/delete', { product_id });
      const updatedItems = cartItems.filter(item => item.product_id !== product_id);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddMore = () => {
   navigate("/breakfast");
    console.log("Add More button clicked");
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px',color:"#712121" }}>Cart Items</h2>
      <Grid container spacing={3} justifyContent="center" sx={{ display: "flex", flexDirection: "column", alignItems: 'left', marginLeft:"50px"}}>
        {cartItems.map(item => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: '100%', width: "800px", backgroundColor:"#ffff0021" }}>
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '130px', maxHeight: '60px', objectFit: 'cover', marginRight: '20px' }} />
                <div style={{ flexGrow: 1 }}>
                  <Typography variant="h6" >{item.name}</Typography>
                  <Typography variant="body2" sx={{color: "brown",fontWeight:"bold"}}  >{item.description}</Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography variant="body1">Quantity: {item.quantity}</Typography>
                      <IconButton><Add  sx={{ color: "green", height: '0.8em',width:'0.8em'}} /></IconButton>


                      <IconButton  ><Remove sx={{color:"black", height: '0.8em',width:'0.8em' }} /></IconButton>
                      <IconButton  onClick={() => handleDelete(item.product_id)}><Delete sx={{color:"#DA291C", height: '0.8em',width:'0.8em' }} /></IconButton>
                    </div>
                    <div>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Price:{item.price}</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleAddMore} 
      style={{
         marginTop: '20px',
         backgroundColor: "#ffd93cf0 ",
         color:"brown",
           marginLeft:"70px",
           fontWeight:"bold",
           borderRadius:"30px"
            }}>
        Add More
      </Button>
    </div>
  );
};

export default AddToCart;
