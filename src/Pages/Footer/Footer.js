import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const FooterContainer = styled(Box)({
  backgroundColor: "#f5f5f5",
  padding: "20px",
  textAlign: "center",
  marginTop: "auto",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        &copy; {new Date().getFullYear()} MCD. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link href="/about" color="inherit" style={{ marginRight: "10px" }}>
          About Us
        </Link>
        <Link href="/contact" color="inherit" style={{ marginRight: "10px" }}>
          Contact Us
        </Link>
        <Link href="/terms" color="inherit" style={{ marginRight: "10px" }}>
          Terms of Service
        </Link>
        <Link href="/privacy" color="inherit" style={{ marginRight: "10px" }}>
          Privacy Policy
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px" }}>
        For inquiries, please email: <Link href="mailto:info@mcd.com">info@mcd.com</Link>
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
