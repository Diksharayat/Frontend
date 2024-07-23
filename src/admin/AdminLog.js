import {
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import burbg from "../assets/Images/burbg.png";
import Egg from "../assets/Images/Egg.jpg";
import fries from "../assets/Images/fries-removebg-preview.png";

function ALogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Password visibility
  const [show, setShow] = useState(false);
  const visibility = () => {
    setShow(show ? false : true);
  };
  //
  // alert(localStorage.getItem('Ngo'))
  if (localStorage.getItem("NgoLog")) {
    navigate("/NgoProfile");
  }

  const nlog = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Grid
        container
        className="bg1"
        style={{ backgroundColor: "rgb(255, 249, 196)", minHeight: "100vh" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", zIndex: 0 }}
        >
          <path
            fill="#ff5500"
            fill-opacity="1"
            d="M0,64L40,58.7C80,53,160,43,240,48C320,53,400,75,480,90.7C560,107,640,117,720,106.7C800,96,880,64,960,64C1040,64,1120,96,1200,106.7C1280,117,1360,107,1400,101.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>

        <Grid container style={{ margin: "auto", marginTop: "10em" }}>
          <Grid lg={1}></Grid>
          <Grid
            lg={3}
            style={{
              position: "relative",
              zIndex: "5",
              marginRight: "10px",
              borderRadius: "5px 45px 5px",
            }}
            className="ngo_g"
          >
            <Typography
              variant="h2"
              fontWeight={"400"}
              className=""
              color="#cc0000"
            >
              ＬＯＧＩＮ
            </Typography>

            <CardContent
              sx={{ m: 1, width: "400px" }}
              size="small"
              variant="outlined"
              style={{ textAlign: "center", margin: "auto" }}
            >
              <form onSubmit={nlog} encType="multipart/form-data">
                {/* email */}
                <CardContent>
                  <TextField
                    id="input-with-icon-textfield"
                    type="email"
                    required
                    fullWidth
                    label="ＥＭＡＩＬ"
                    style={{ color: "#cc0000" }}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ color: "#cc0000", marginRight: 5 }}
                        >
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </CardContent>

                {/* password */}
                <CardContent>
                  <TextField
                    fullWidth
                    className="textf"
                    type={show ? "text" : "password"}
                    label="ＰＡＳＳＷＯＲＤ"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            style={{ color: "#cc0000", marginRight: 5 }}
                            aria-label="toggle password visibility"
                            onClick={visibility}
                            edge="start"
                          >
                            {show ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </CardContent>

                {/* btn */}
                <CardContent>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{
                      background: "#cc0000dd",
                      fontWeight: "bold",
                      marginLeft: "-260px",
                    }}
                  >
                    <b>ＬＯＧＩＮ</b>
                  </Button>
                </CardContent>
              </form>
            </CardContent>
          </Grid>
          <Grid lg={3}>
            <img
              style={{ marginLeft: "500px", marginTop: "200px" }}
              src={fries}
              alt="egg"
            />
          </Grid>
          <Grid lg={4}>
            {/* <img
    src={burbg}
    alt="ngo"
   /> */}
          </Grid>
        </Grid>
      </Grid>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ position: "fixed", bottom: 0, zIndex: 0 }}
      >
        <path
          fill="#ff5500"
          fill-opacity="1"
          d="M0,256L40,245.3C80,235,160,213,240,202.7C320,192,400,192,480,181.3C560,171,640,149,720,144C800,139,880,149,960,176C1040,203,1120,245,1200,234.7C1280,224,1360,160,1400,128L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
export default ALogin;
