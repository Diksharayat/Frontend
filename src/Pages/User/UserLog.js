import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";

function UserLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_TEST_VARIABLE, "VARIABLE TEST")

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://mcd-pi.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
  
     
      toast.success("Login Successful");
      navigate("/breakfast");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Grid
        container
        className="user_log"
        style={{ backgroundColor: "#DDBB99", minHeight: "100vh" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 12 1440 320"
          style={{ position: "absolute", zIndex: 0, opacity: 0.9 }}
        >
          <path
            fill="#FFC72C"
            fillOpacity="1"
            d="M0,64L40,58.7C80,53,160,43,240,48C320,53,400,75,480,90.7C560,107,640,117,720,106.7C800,96,880,64,960,64C1040,64,1120,96,1200,106.7C1280,117,1360,107,1400,101.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>

        <Grid style={{ padding: 50, margin: "auto" }} className="admin_g">
          <Typography
            variant="h4"
            className="Head"
            style={{
              color: "#9a031fe0",
              margin: "auto",
              textAlign: "center",
            }}
          >
            ＬＯＧＩＮ
          </Typography>

          <CardContent
            sx={{ m: 1, width: "400px" }}
            size="small"
            variant="outlined"
            style={{ textAlign: "center", margin: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <CardContent>
                <TextField
                  fullWidth
                  className="textf"
                  label="ＥＭＡＩＬ"
                  style={{ color: "#9a031fe0" }}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ color: "#9a031fe0", marginRight: 5 }}
                      >
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </CardContent>

              {/* Password */}
              <CardContent>
                <TextField
                  fullWidth
                  className="textf"
                  type={showPassword ? "text" : "password"}
                  label="ＰＡＳＳＷＯＲＤ"
                  style={{ color: "#9a031fe0" }}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          style={{ color: "#9a031fe0", marginRight: 5 }}
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </CardContent>

              {/* Login Button */}
              <CardContent>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{ backgroundColor: "#9a031fe0", color: "#FFF" }}
                >
                  ＬＯＧＩＮ
                </Button>
              </CardContent>
            </form>

        
            <Divider />
            <Grid>
              <CardContent margin="auto">
                <br />
                <Typography
                  variant="subtitle2"
                  style={{
                    color: "#9a031fe0",
                    fontWeight: "bold",
                  }}
                >
                  ＤＯＮ'Ｔ ＨＡＶＥ ＡＮ ＡＣＣＯＵＮＴ
                </Typography>

                <Link to="/userreg" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "#9a031fe0", color: "#FFF" }}
                  >
                    <Typography variant="button">ＲＥＧＩＳＴＥＲ</Typography>
                  </Button>
                </Link>
              </CardContent>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
}

export default UserLog;
