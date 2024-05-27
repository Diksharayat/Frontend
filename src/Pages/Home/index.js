import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles for the carousel
import { Typography, Button } from "@mui/material";
import Egg from "../../assets/Images/Egg.jpg";
import fruit from "../../assets/Images/fruit.jpg";
import happyHam from "../../assets/Images/happyHam.jpg";


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
    height: "300px", // Adjust the height of the carousel
    backgroundColor: "#fff", // Optional: set background color
  };

  const imgStyle = {
    height: "250px", // Adjust the maximum height of the images
    width: "auto",
    justifyContent: "center",
  };

  return (
    <Carousel
      autoPlay={true} // Enable auto play
      infiniteLoop={true} // Enable infinite loop
      showThumbs={false} // Hide thumbnail navigation
      showStatus={false} // Hide status indicator
      interval={2000} // Set auto play interval to 5 seconds
      style={{ maxWidth: "500px", margin: "auto" }} // Set maximum width and center the carousel
    >
      <div style={slideStyle}>
        <img src={Egg} alt="Egg" style={imgStyle} />
        <div className="legend">
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
        <div className="legend">
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
        <div className="legend">
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
  );
};

export default HomePageCarousel;
