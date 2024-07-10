import React from 'react'
import confeti_square from "../../assets/confeti_square.gif";
import Check from "../../assets/Images/check.svg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {

  const navigate= useNavigate();

  const addToCartBtnStyle = {
    backgroundColor: "#ffd93cf0",
    fontWeight: "900",
    color: "#26120fbd",
    padding: "10px 10px",
  };
  return (
    <div>
        <div
      style={{
        fontFamily: "Roboto, sans-serif",
        textAlign: "center",
        fontSize: "18px",
        lineHeight: "24px",
        margin: "0 auto",
        marginTop:"40px",
        maxWidth: "480px",
      }}
    >
      <div
        style={{position: "relative", display: "inline-block", marginBottom: "32px"}}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundImage:`url(${Check})`,
            backgroundSize: "cover",
            width: "152px",
            height: "152px",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            backgroundImage:`url(${confeti_square})`,
            backgroundSize:" 97% 97%",
            width: "152px",
            height: "152px",
          }}
        ></div>
      </div>
      <p><strong>Congratulations!</strong></p>
      <p><strong>Fantastic! Your order has been placed Successfully. Have a happy meal! 😊</strong></p>


      <p>You'll hear from us soon.</p>
      <Button variant="contained" style={addToCartBtnStyle} onClick={()=>{navigate("/")}}>
             Back To Home
            </Button>
    </div>
    
    </div>
  )
}

export default Thankyou
