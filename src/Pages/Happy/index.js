import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

const HappyMeal = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
   
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

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mcd-pi.vercel.app/api/products'); 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const filteredProducts = data.filter(product => product.id > 16 && product.id <= 19);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

 
  const addToCart = async (product_id, name, description, price, image) => {
    try {
      // Remove any formatting symbols from the price (assuming it's a string with '$' prefix)
      const cleanedPrice = parseFloat(price.replace('$', ''));
  
      const newItem = { product_id, name, description, price: cleanedPrice, image, quantity: 1, totalPrice: cleanedPrice }; // Initialize totalPrice with price
      let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Check if the item already exists in the cart
      const existingItemIndex = existingCartItems.findIndex(item => item.product_id === product_id);
  
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity and totalPrice
        existingCartItems[existingItemIndex].quantity++;
        existingCartItems[existingItemIndex].totalPrice = existingCartItems[existingItemIndex].quantity * existingCartItems[existingItemIndex].price;
      } else {
        // Item does not exist, add it to cart
        existingCartItems.push(newItem);
      }
  
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      toast.success("Item added to the cart");
      console.log(existingCartItems);
    } catch (error) {
      console.error('Error adding item:', error);
    
    }
  };
  
  if (loading) {
   
    return (
      <Grid container spacing={4}>
        {[1, 2, 3].map((placeholderId) => ( 
          <Grid item xs={12} sm={6} md={4} lg={4} key={placeholderId}>
            <CustomCard style={{ width: '100%',height:"800px", maxHeight: '200px', objectFit: 'cover' }}>
              <CardContent>
                <CircularProgress sx={{ color: "#ffd93c" }} style={{ margin: 'auto' }}/>
              </CardContent>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    );
  }

 
  return (
    <Grid container spacing={2}>
      {products.map(product => (
         <Grid item xs={12} sm={6} md={4} lg={4} key={product.id} style={{ marginBottom: '20px', marginTop: '20px' }}>
          <CustomCard>
            <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h5" sx={{ color: "#26120fbd", fontWeight: "bold" }} gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="body1">
                Price: {product.price}
              </Typography>
            </CardContent>
            <Button variant="contained" style={addToCartBtnStyle} onClick={() => addToCart(product.id, product.name, product.description, product.price, product.image, product.quantity)}>
              Add to Cart
            </Button>
          </CustomCard>
        </Grid>
      ))}
    </Grid>
  );
};
export default HappyMeal;
