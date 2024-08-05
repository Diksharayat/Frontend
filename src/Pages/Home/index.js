import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./Home.css"; 
import { Typography, Button } from "@mui/material";
import fruit from "../../assets/Images/fruit.png";
import happyHam from "../../assets/Images/happyHam-removebg-preview.png";
import { Egg } from "@mui/icons-material";


const HomePageCarousel = () => {
  const addToCartBtnStyle = {
    backgroundColor: "#ffd93cf0",
    fontWeight: "900",
    color: "#26120fbd",
    padding: "5px 10px",
    fontSize: "14px",
  };

  const slideStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px", 
    backgroundColor: "rgb(244 223 148 / 78%)", 
  };

  const imgStyle = {
    height: "300px", 
    width: "auto",
    justifyContent: "center",
  };

  return (
    <div style={{ width: "100%", maxWidth: "100vw", overflow: "hidden", backgroundColor: "yellow" }}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={2000}
        style={{ width: "100%", maxWidth: "100%", backgroundColor: "yellow" }}
      >
        <div style={slideStyle}>
          <img src={fruit} alt="Egg" style={imgStyle} />
          <div className="legend" style={{ backgroundColor: "#26120fbd" }}>
            <Typography variant="h5" component="h2">
              Welcome to our website
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ante sed felis
              faucibus hendrerit.
            </Typography>
            <Button style={addToCartBtnStyle} variant="contained" color="primary">
              Learn More
            </Button>
          </div>
        </div>
        <div style={slideStyle}>
          <img src={fruit} alt="Fruit" style={imgStyle} />
          <div className="legend" style={{ backgroundColor: "#26120fbd" }}>
            <Typography variant="h5" component="h2">
              Discover our products
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ante sed felis
              faucibus hendrerit.
            </Typography>
            <Button style={addToCartBtnStyle} variant="contained" color="primary">
              Shop Now
            </Button>
          </div>
        </div>
        <div style={slideStyle}>
          <img src={happyHam} alt="Breakfast" style={imgStyle} />
          <div className="legend" style={{ backgroundColor: "#26120fbd" }}>
            <Typography variant="h5" component="h2">
              Join our community
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ante sed felis
              faucibus hendrerit.
            </Typography>
            <Button style={addToCartBtnStyle} variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HomePageCarousel;
