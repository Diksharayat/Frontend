import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Container,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { toast } from 'react-toastify';
import shoping from "../../assets/Images/shoping.jpg";

const NAME_REGEX = /^[A-Z][a-z]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADDRESS_REGEX = /^[a-zA-Z0-9\s,.-]+$/;

const CustomModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF',
  borderRadius: '10px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [totalPriceAdd, setTotalPriceAdd] = useState(0);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false); 
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const uniqueItems = removeDuplicates(storedCartItems);
    setCartItems(uniqueItems);
    const totalPrice = uniqueItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    setTotalPriceAdd(totalPrice || 0); 
  }, []);

  const removeDuplicates = (items) => {
    const uniqueItems = items.reduce((acc, current) => {
      const existingItemIndex = acc.findIndex(item => item.product_id === current.product_id);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += current.quantity;
        acc[existingItemIndex].totalPrice += current.totalPrice;
      } else {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueItems;
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName === '' || NAME_REGEX.test(inputName)) {
      setName(inputName);
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleDelete = (product_id) => {
    const updatedItems = cartItems.filter(item => item.product_id !== product_id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleAddMore = () => {
    navigate("/breakfast");
  };

  const handleCheckout = () => {
    handleOpen();
  };

  const handlePlaceOrder = () => {
    if (!name || !email || !address) {
      toast.error('Please fill all the required fields.');
      return;
    }

    setLoading(true);

    const orderData = {
      name,
      email,
      address,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPriceAdd
    };

    fetch('https://mcd-pi.vercel.app/api/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    .then(response => {
      if (response.ok) {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        handleClose();
        toast.success("Order Placed Successfully");
      } else {
        alert('Failed to place order. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    })
    .finally(() => {
      setLoading(false); 
    });
  };

  const handleQuantityChange = (productId, action) => {
    const updatedItems = cartItems.map(item => {
      if (item.product_id === productId) {
        let newQuantity = item.quantity;
        if (action === 'decrement' && newQuantity > 1) {
          newQuantity--;
        } else if (action === 'increment') {
          newQuantity++;
        }
        const newTotalPrice = item.price * newQuantity;
        return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
      }
      return item;
    });

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    const newTotalPrice = updatedItems.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);

    setTotalPriceAdd(newTotalPrice);
  };

  const handleReturnToShop = () => {
    navigate("/breakfast");
  };

  return (
    <Container maxWidth="xl">
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#712121" }}>
        SHOPPING CART
      </h2>
      {cartItems.length > 0 ? (
        <>
          <Grid container spacing={3} justifyContent="center" direction="column">
            {cartItems.map((item, index) => (
           <Grid item xs={12} sm={6} md={4} lg={3}> 
           <Card style={{ height: "100%", backgroundColor: "#ffff0021", position: "relative", width: "100%" }}>
             <IconButton onClick={() => handleDelete(item.product_id)} style={{ position: "absolute", top: "10px", right: "10px" }}>
               <Delete sx={{ color: "#DA291C", height: "0.8em", width: "0.8em" }} />
             </IconButton>
             <CardContent style={{ display: "flex", alignItems: "center" }}>
               <img src={item.image} alt={item.name} style={{ width: "130px", maxHeight: "60px", objectFit: "cover", marginRight: "20px" }} />
               <div style={{ flexGrow: 1 }}>
                 <Typography variant="h6">{item.name}</Typography>
                 <Typography variant="body2" sx={{ color: "brown", fontWeight: "bold" }}>{item.description}</Typography>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                   <div style={{ display: "flex", alignItems: "center" }}>
                     <IconButton onClick={() => handleQuantityChange(item.product_id, 'decrement')}>
                       <Remove sx={{ color: "red" }} />
                     </IconButton>
                     <div style={{ textAlign: "center", borderRadius: "14px", padding: "4px 12px", backgroundColor: "white", color: "brown", fontWeight: "bold", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}>
                       {item.quantity}
                     </div>
                     <IconButton onClick={() => handleQuantityChange(item.product_id, 'increment')}>
                       <Add sx={{ color: "green" }} />
                     </IconButton>
                   </div>
                   <div style={{ textAlign: "center" }}>
                     {item.quantity === 1 ? (
                       <Typography variant="body1" sx={{ fontWeight: "bold" }}>Price: ${item.price.toFixed(2)}</Typography>
                     ) : (
                       <Typography variant="body1" sx={{ fontWeight: "bold" }}> Price: ${item.totalPrice.toFixed(2)}</Typography>
                     )}
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </Grid>
            ))}
          </Grid>

          <div style={{ marginTop: "20px", textAlign: "center", marginLeft: "1150px" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#712121" }}>Total: ${totalPriceAdd.toFixed(2)}</Typography>
          </div>

          <Button
            variant="contained"
            onClick={handleAddMore}
            style={{
              marginTop: "20px",
              backgroundColor: "#ffd93cf0 ",
              color: "black",
              fontWeight: "bold",
              borderRadius: "30px",
            }}
          >
            Add More
          </Button>
          <Button
            variant="contained"
            onClick={handleCheckout}
            style={{
              marginTop: "20px",
              backgroundColor: "#ffd93cf0 ",
              color: "black",
              fontWeight: "bold",
              borderRadius: "30px",
              marginLeft: "590px",
            }}
          >
            Checkout
          </Button>

        
          <CustomModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              <Scrollbars style={{ width: 600, height: 500, color: "#FFD700" }} renderThumbVertical={({ style, ...props }) => (
                <div {...props} style={{ ...style, backgroundColor: "rgb(255 217 60 / 94%)", borderRadius: "8px" }} />
              )}>
                <ModalContent>
                  <Typography variant="h5" component="h2" gutterBottom style={{ fontStyle: "upper", textAlign: "center", marginBottom: "20px", color: "#712121", fontWeight: "bold" }}>
                    Your Order
                  </Typography>

                  {cartItems.map((item, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }} variant="body1" gutterBottom>
                        <span style={{ marginRight: "5px", color: "black" }}>{item.quantity} x </span> {item.name}
                      </Typography>
                      <Typography sx={{ color: "black", fontSize: "14px" }} variant="body1" gutterBottom>
                        ${item.totalPrice.toFixed(2)}
                      </Typography>
                    </div>
                  ))}
                  <Typography variant="body1" gutterBottom style={{ textAlign: "right", marginTop: "20px", color: "#712121", fontWeight: "bold" }}>
                    Total: ${totalPriceAdd.toFixed(2)}
                  </Typography>
                  <Divider variant="inset" />
                  <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left", marginTop: "10px", color: "#712121" }} >User Details</Typography>

                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={handleNameChange}
                    error={nameError}
                    helperText={nameError ? 'Please enter a valid name (for ex: John)' : ''}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(!EMAIL_REGEX.test(e.target.value));
                    }}
                    error={emailError}
                    helperText={emailError ? 'Please enter a valid email address' : ''}
                    value={email}
                  />
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressError(!ADDRESS_REGEX.test(e.target.value));
                    }}
                    error={addressError}
                    helperText={addressError ? 'Please enter a valid address' : ''}
                  />
                  {loading ? (
                    <CircularProgress sx={{ color: "#ffd93c" }} style={{ margin: 'auto' }} />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#FFC72C",
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: "30px",
                      }}
                    >
                      Place Order
                    </Button>
                  )}
                </ModalContent>
              </Scrollbars>
            </div>
          </CustomModal>
        </>
      ) : (
        <>
          <img style={{ display: "block", margin: "auto" }} src={shoping} alt="No items in the cart" />
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center", marginTop: "40px", fontWeight: "bolder" }}>
            Your Cart is Currently Empty!
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ textAlign: "center", marginTop: "30px", color: "grey" }}>
            Before Proceed to checkout you must add some products to your shopping cart
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ textAlign: "center", color: "grey" }}>
            You will find a lot of interesting products on our website.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FFC72C",
              color: "black",
              fontWeight: "bold",
              borderRadius: "30px",
              display: "block",
              margin: "auto",
              marginTop: "30px",
            }}
            onClick={handleReturnToShop}
          >
            Return to shop
          </Button>
        </>
      )}
    </Container>
  );
};

export default AddToCart;
