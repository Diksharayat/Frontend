import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Box, CardContent, Grid, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { toast } from "react-toastify";

function UserReg() {
  const c5 = "#0f4c5c"; // blue

  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    contact: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
  });

  const [emailError, setEmailError] = useState(false); 
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_])[0-9a-zA-Z\W\_]{8,}$/;
  

  const visibility = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValidPassword = true;
  
    if (name === 'password') {
      isValidPassword = PASSWORD_REGEX.test(value);
    }
  
    setFormData({
      ...formData,
      [name]: value,
      isValidPassword: isValidPassword,
    });
  };
  

  console.log(formData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    fetch('https://mcd-pi.vercel.app/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast.success("user registered");
      navigate('/userlog'); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <Grid container className="rect" style={{ backgroundColor: "#DDBB99", backgroundAttachment: 'fixed', opacity: "1", minHeight: '100vh' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: 'absolute', zIndex: 0, opacity: .9 }}>
          <path fill="#FFC72C" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,208C480,171,600,85,720,80C840,75,960,149,1080,170.7C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
        <Grid style={{ margin: "auto", marginTop: '10vh' }} className="Glass">
          <Typography variant="h2" className="" style={{ color: c5 ,
              margin: "auto",
              textAlign: "center",
              marginTop:"60px"}}>
            Ｊｏｉｎ Ｕｓ
          </Typography>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 1 }}>
              <AccountCircle sx={{ color: c5, mr: 2, my: 0.5 }} />
              <TextField
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                variant="standard"
                required
                style={{ width: '30em' }}
                type="text"
                size="small"
                placeholder="ＵＳＥＲＮＡＭＥ"
              />
            </Box>
            <br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 1 }}>
              <MailIcon sx={{ color: c5, mr: 2, my: 0.5 }} />
              <TextField
                name="email"
                value={formData.email}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({
                    ...formData,
                    [name]: value,
                  });
                  setEmailError(!EMAIL_REGEX.test(value));
                }}
                error={emailError}
                helperText={emailError ? 'Please enter a valid email address' : ''}
                required
                variant="standard"
                style={{ color: c5, width: '30em' }}
                fullWidth
                type="email"
                size="small"
                placeholder="ＥＭＡＩＬ"
              />
            </Box>
            <br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 1 }}>
              <CallIcon sx={{ color: c5, mr: 2, my: 0.5 }} />
              <TextField
  name="contact"
  type="tel"
  value={formData.contact}
  onChange={handleChange}
  variant="standard"
  style={{ color: c5, width: '30em' }}
  required
  fullWidth
  size="small"
  placeholder="ＣＯＮＴＡＣＴ"
  inputProps={{
    maxLength: 10,
  }}
/>
            </Box>
            <br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 1 }}>
              <InputAdornment position="start">
                <IconButton
                  style={{ color: c5, marginBottom: 20, marginLeft: -8 }}
                  aria-label="toggle password visibility"
                  onClick={visibility}
                  edge="start"
                >
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              <TextField
  name="password"
  value={formData.password}
  onChange={handleChange}
  variant="standard"
  style={{ color: "#f79d65", width:'30em', marginLeft:"2px"}}
  required
  fullWidth
  type={show ? "text" : "password"}
  size="small"
  placeholder="ＰＡＳＳＷＯＲＤ"
  error={!formData.isValidPassword}
  helperText={!formData.isValidPassword ? 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.' : ''}
/>

            </Box>
            <CardContent>
              <Button
                variant="contained"
                type='submit'
                size="large"
                style={{ background: c5, color: '#a3d6d1', fontSize: 14 }}
              >
                <b>ＲＥＧＩＳＴＥＲ</b>
              </Button>
            </CardContent>
          </form>
          <CardContent>
            <Button
              variant="contained"
              size="large"
              style={{ background: "#a3d6d1", color: c5 }}
            >
              <Link
                to="/userlog"
                className="lnk"
                style={{ textDecoration: "none", color: c5 }}
              >
                <b>Ａｌｒｅａｄｙ ｈａｖｅ ａｎ ａｃｃｏｕｎｔ？ Ｌｏｇｉｎ</b>
              </Link>
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
}

export default UserReg;
