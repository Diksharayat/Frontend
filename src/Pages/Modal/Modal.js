
import React, { useState } from 'react'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
// import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

const CustomModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF",
  borderRadius: "10px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
  padding: theme.spacing(3),
  textAlign: "center",
  maxHeight: "80vh",
  overflowY: "auto",
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: "#FFC72C",
  color: "#000",
  fontWeight: "bold",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#FFC72C",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "10%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modal = ({ cartItems }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  return (
    <div>
     <ModalContent>
    <Typography variant="h6" component="h2" gutterBottom  style={{ textAlign: "center", marginBottom: "20px", color: "#712121", fontWeight:"bold" }}>
      Your Order
    </Typography>
    {cartItems.map((item, index) => (
        <div key={item.product_id} style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
        {/* Display item image
        <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", marginRight: "10px" }} /> */}
      <div key={item.product_id} style={{ textAlign: "left" }}>
        <Typography variant="body1" gutterBottom>
          <span style={{ marginRight: "5px" }}>{index + 1}.</span> Item Name: {item.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span style={{ marginRight: "5px" }}>Price:</span> ${item.price}
        </Typography>
      </div>
      </div>
    ))}
    <Typography variant="body1" gutterBottom style={{ textAlign: "right", marginTop: "20px",color: "#712121", fontWeight:"bold" }}>
      Total: ${totalPrice}
    </Typography>

    <Divider variant="inset" />
    
    <Typography variant="h4" sx={{fontWeight:"bold",textAlign: "left",marginTop:"10px"}} >User Details</Typography>

  
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
      // Add onChange and value props to handle input
      onChange={(e) => setAddress(e.target.value)}
      value={address}
    />

    <Button
      variant="contained"
      onClick={handleCheckout}
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
    </div>
  )
}

export default Modal
