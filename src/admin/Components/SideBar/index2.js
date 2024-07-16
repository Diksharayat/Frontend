import React, { Suspense, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../../assets/Images/logo.png";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Avatar, Badge, Button, Grid, LinearProgress, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { SideBarMemoizated } from "./Components/MemoizatedSidebar";
import { yellow } from "@mui/material/colors";
import Menu from "@mui/material/Menu";



const drawerWidth = 270;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
   
    backgroundColor: theme.palette.background.default, 
  })
);





const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));


export default function PersistentDrawerLeftAdmin(props) {
  const [open, setOpen] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email"); 
  const [showProfile, setShowProfile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768); // Adjust this width according to your design's responsiveness
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };


  const CustomBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#FFD700',
      color: 'black',
    },
  }));


  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpen = (forceClose = false) => {
    setOpen(forceClose ? false : !open);
  };

  
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {

    if (action === "Logout") {
     
      localStorage.removeItem("token");
      localStorage.removeItem("email"); 

      
    navigate("/breakfast"); 
    } else if (action === "Profile") {
      navigate("/adminprofile");
    }else if(action==="ContactUs"){
      navigate("/contact");
    }else if(action==="Orders"){
      navigate("/orders");
    }
   
   
    handleClose(); 
  };


  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "";

  const navigateToCart = () => {
    navigate('/addtocart');
  };



  return (
    <Box sx={{ display: "flex", padding: "4px" }}>
   <AppBar position="fixed" open={open} sx={{ backgroundColor: "#5b0707", boxShadow: 0 }}>
        <Toolbar>
        <IconButton
            color="black"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon sx={{ color: "rgb(255, 249, 196)" }} />
          </IconButton>
          {!open && (
            <img style={{ height: "30px" }} src={logo} alt="LogoWithTagLine" />
          )}
          <Grid container justifyContent="flex-start" alignContent="center">
            <IconButton
              color="black"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                display: "contents",
                ...(open === false && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "rgb(255, 249, 196)" }} />
            </IconButton>
          </Grid>
          <Grid container justifyContent="flex-start" alignItems="center" >
           
              <>
              <Grid ml={70} >
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ bgcolor: "rgb(255, 249, 196)", color:"#4b1603", cursor: 'pointer' }}
                >
                  {firstLetter}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleMenuItemClick("Profile")}>
                 Profile
                  </MenuItem>

      {/* {showProfile && (
        <Profile uname={uname} contact={contact} />
      )} */}

     
      <Divider />
      {/* <MenuItem onClick={() => handleMenuItemClick("Orders")}>Orders</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("ContactUs")}>ContactUs</MenuItem> */}
      <MenuItem onClick={() => handleMenuItemClick("Logout")}>Logout</MenuItem>
                </Menu>
                </Grid>
              </>
         
            
          </Grid>
         
        </Toolbar>
      </AppBar>
      <Divider style={{ backgroundColor: "#ffffff" }}/>
      <Drawer
      sx={{
        m: 0,
        width: drawerWidth,
        backgroundColor: "#5b0707", // Set the background color here
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "2px solid white",
          backgroundColor: "#5b0707", // Ensure the paper inside Drawer also has the same background
        },
      }}
        variant="persistent"

        anchor="left"
        open={open}
      >

        <Scrollbars style={{ height: "100%", color: "#FFD700" }} renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "rgb(255 217 60 / 94%)",
              borderRadius: "8px",
            }}
          />
        )} >
          <DrawerHeader style={{backgroundColor:"#5b0707"}}>
            <IconButton>
              <img
                style={{ height: "30px" }}
                src={logo}
                alt="LogoWithTagLine"
              />
            </IconButton>
          </DrawerHeader>
          <Divider style={{ backgroundColor: "#ffffff" }} />

          <Grid style={{backgroundColor:"#5b0707"}}>
          <List component="nav" aria-labelledby="nested-list-subheader" style={{backgroundColor:"#5b0707"}}>
            <>
              <NavLink
                to="/manage-category"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    
                    <Grid item xs={12} >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color:"rgb(255, 249, 196)", marginLeft: "30px", fontSize: "15px" ,fontWeight:"bold", paddingBottom:"-10px" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"MANAGE  \u00A0\u00A0  CATEGORY"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>

              <NavLink
                to="/manage-dishes"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                   
                  <Grid item xs={12} >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color:"rgb(255, 249, 196)", marginLeft: "30px", fontSize: "15px" ,fontWeight:"bold", paddingBottom:"-10px" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"MANAGE  \u00A0\u00A0  DISHES"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>
              <NavLink
                to="/allOrders"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                  
                    <Grid item xs={12} >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "rgb(255, 249, 196)", marginLeft: "30px",fontSize: "15px" ,fontWeight:"bold", paddingBottom:"-10px" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated
                              title={"ALL \u00A0\u00A0 ORDERS"}
                            />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>

         
            </>
          </List>
          </Grid>
        </Scrollbars>
      </Drawer>

      <Main
        open={open}
        style={{
          padding: "10px 40px 40px 40px",
          minHeight: "100vh",
          backgroundColor: yellow[100], 
        }}
      >
        <DrawerHeader />
        <Suspense fallback={<LinearProgress />} sx>
          <Box pt="20px" sx={{ m: 0 }}>
            {props.children}
          </Box>
        </Suspense>
      </Main>

    </Box>
  );
}
