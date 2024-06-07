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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import shoping from "../../assets/Images/shoping.jpg";
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { toast } from 'react-toastify';

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



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius:"10%",
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [totalPriceAdd, setTotalPriceAdd] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');


  useEffect(() => {
    const fetchCartItems = () => {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = storedCartItems.map((item) => {
        let price = item.price;
      
        if (typeof price === "string") {
          price = parseFloat(price.replace("$", ""));
        }
        return { ...item, price };
      });
      setCartItems(updatedCartItems);
    };

    fetchCartItems();

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    localStorage.removeItem("cartItems");
  };

  const handleDelete = (product_id) => {
    const updatedItems = cartItems.filter(
      (item) => item.product_id !== product_id
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleAddMore = () => {
    navigate("/breakfast");
  };
 

  
  const groupedCartItems = cartItems.reduce((acc, currentItem) => {
    const existingItemIndex = acc.findIndex(
      (item) => item.product_id === currentItem.product_id
    );
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity++;
      acc[existingItemIndex].totalPrice =
        (acc[existingItemIndex].price || 0) * acc[existingItemIndex].quantity;
    } else {
      acc.push({
        ...currentItem,
        quantity: 1,
        totalPrice: currentItem.price || 0,
      });
    }
    return acc;
  }, []);

  const handleCheckout = () => {
   
    const totalPrice = cartItems.reduce((acc, currentItem) => acc + currentItem.totalPrice, 0);
    setTotalPriceAdd(totalPrice);
    handleOpen();
  };

  const handlePlaceOrder = () => {
    const orderData = {
      name,
      email,
      address,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice
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
    });
  };



  const totalPrice = groupedCartItems.reduce((acc, currentItem) => acc + currentItem.totalPrice, 0);


  const handleReturnToShop = () => {
    navigate("/breakfast");
  };


  return (
    <Container maxWidth="xl">
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#712121" }}
      >
         SHOPPING CART
      </h2>
      {groupedCartItems.length > 0 ? (
      <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        direction={"column"}
      >
        {groupedCartItems?.map((item) => (
          <Grid item key={item.product_id} xs={6} sm={6} md={6} lg={6}>
            <Card
  style={{
    height: "100%",
    width: "800px",
    backgroundColor: "#ffff0021",
    position: "relative", 
  }}
>
 
  <IconButton
    onClick={() => handleDelete(item.product_id)}
    style={{
      position: "absolute",
      top: "10px", 
      right: "10px", 
    }}
  >
    <Delete
      sx={{
        color: "#DA291C",
        height: "0.8em",
        width: "0.8em",
      }}
    />
  </IconButton>

  <CardContent style={{ display: "flex", alignItems: "center" }}>
    <img
      src={item.image}
      alt={item.name}
      style={{
        width: "130px",
        maxHeight: "60px",
        objectFit: "cover",
        marginRight: "20px",
      }}
    />
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography
        variant="body2"
        sx={{ color: "brown", fontWeight: "bold" }}
      >
        {item.description}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="body1">
            Quantity: {item.quantity}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Price: ${item.totalPrice}
          </Typography>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

          </Grid>
        ))}
      </Grid>
           

<div style={{ marginTop: "20px", textAlign: "center", marginLeft: "150px"}}>
  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#712121" }}>
    Total:  ${totalPrice}
  </Typography>
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
      </>
    ) : (

      <>
      
      <img style={{ display: "block", margin: "auto" }} src={shoping} alt="No items in the cart" />
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", marginTop: "40px",fontWeight:"bolder" }}>
       Your Cart is Currently Empty!
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ textAlign: "center",marginTop: "30px",color:"grey" }}>
       Before Proceed to checkout you must add some products to your shopping cart
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ textAlign: "center" ,color:"grey" }}>
       You will find a lot of interesting products on our website.
      </Typography>
    
      <Button
  variant="contained"
  style={{
   
    backgroundColor: "#FFC72C",
    color: "black",
    fontWeight: "bold",
    borderRadius: "30px",
    display: "flex",
    display: "block", margin: "auto",
    marginTop:"30px",
    
  }}
  onClick={handleReturnToShop}
>
  Return to shop
</Button>

     </>
    )}
 <CustomModal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <div>
    <Scrollbars style={{ width: 600, height: 500, color: "#FFD700"}} renderThumbVertical={({ style, ...props }) => (
      <div {...props} style={{ ...style, backgroundColor: "rgb(255 217 60 / 94%)", borderRadius: "8px" }} />
    )}>
      <ModalContent>
        <Typography variant="h5" component="h2" gutterBottom  style={{ fontStyle:"upper", textAlign: "center", marginBottom: "20px", color: "#712121", fontWeight:"bold" }}>
          Your Order
        </Typography>
        
        {Object.values(cartItems.reduce((acc, item) => {
          if (!acc[item.product_id]) {
            acc[item.product_id] = { ...item, quantity: 0, totalPrice: 0 };
          }
          acc[item.product_id].quantity++;
          acc[item.product_id].totalPrice += item.price || 0;
          return acc;
        }, {})).map((groupedItem, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{color:"black", fontWeight: "bold", fontSize: "16px"}} variant="body1" gutterBottom>
              <span style={{ marginRight: "5px",color:"black" }}>{groupedItem.quantity}x</span> {groupedItem.name}
            </Typography>
            <Typography sx={{color:"black", fontSize: "14px"}} variant="body1" gutterBottom>
              ${groupedItem.totalPrice.toFixed(2)}
            </Typography>
          </div>
        ))}
        <Typography variant="body1" gutterBottom style={{ textAlign: "right", marginTop: "20px",color: "#712121", fontWeight:"bold" }}>
          Total: ${totalPrice}
        </Typography>
        <Divider variant="inset" />
        <Typography variant="h5" sx={{fontWeight:"bold",textAlign: "left",marginTop:"10px",  color: "#712121"}} >User Details</Typography>
     
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
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
      </ModalContent>
    </Scrollbars>
  </div>
</CustomModal>





    </Container>
  );
};

export default AddToCart;
