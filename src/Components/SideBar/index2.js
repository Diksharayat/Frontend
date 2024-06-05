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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/Images/logo.png";
import fish from "../../assets/Images/fish.jpg";
import meals from "../../assets/Images/meals.jpg";
import burgers from "../../assets/Images/burgers.jpg";
import frr from "../../assets/Images/frr.jpg";
import happy from "../../assets/Images/happy.jpg";
import breakfast from "../../assets/Images/breakfast.jpg";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Badge, Grid, LinearProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { SideBarMemoizated } from "./Components/MemoizatedSidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { yellow } from "@mui/material/colors";

import axios from "axios";

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


export default function PersistentDrawerLeft(props) {
  const [open, setOpen] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();
  const [newItemAdded, setNewItemAdded] = useState(false); // State to track new item added

  

  useEffect(() => {
    const fetchCartItemsCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const count = storedCartItems.length; // Get the count of items in local storage
      setCartItemsCount(count);
    };
  
    fetchCartItemsCount(); 
  
  
    const interval = setInterval(fetchCartItemsCount, 1000);
  
 
    const handleBeforeUnload = () => {
      clearInterval(interval);
      localStorage.removeItem('cartItems'); 
      setCartItemsCount(0); 
    };
  
   
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); 
  

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  

  

const CustomBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FFD700', 
    color: 'black', 
  },
}));

  

  const navigateToCart = () => {
    navigate('/addtocart');
  };

  return (
    <>
    
    <Box sx={{ display: "flex", padding: "4px" }}>
      <AppBar
        position="fixed"
        open={open}
        
        sx={{ backgroundColor: "white", boxShadow: 0 }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon sx={{color:"#26120fbd"}}/>
          </IconButton>
          {!open && (
            <img style={{ height: "30px" }} src={logo} alt="LogoWithTagLine" />
          )}
          <Grid container justifyContent={"flex-start"} alignContent="center">
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
              <MenuIcon sx={{color:"#26120fbd"}} />
            </IconButton>
          </Grid>

          <Grid sx={{ backgroundColor: "white", color: "black" }}>
            <IconButton onClick={navigateToCart} >
             
              <CustomBadge badgeContent={cartItemsCount} color="primary">
    <ShoppingCartIcon sx={{color:"#DA291C"}}/>
  </CustomBadge>
            </IconButton>

            
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          m: 0,
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
           
          },
        }}
        variant="persistent"
        
        anchor="left"
        open={open}
      >
        
        <Scrollbars style={{ height: "100%", color: "#FFD700"}} renderThumbVertical={({ style, ...props }) => (
    <div
      {...props}
      style={{
        ...style,
        backgroundColor: "rgb(255 217 60 / 94%)",
        borderRadius: "8px",
      }}
    />
  )} >
          <DrawerHeader>
            <IconButton>
              <img
                style={{ height: "30px" }}
                src={logo}
                alt="LogoWithTagLine"
              />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List component="nav" aria-labelledby="nested-list-subheader">
            <>
            <NavLink
                to="/breakfast"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ListItemIcon>
                        <img
                          src={breakfast}
                          alt="frr"
                          width={120}
                          height={80}
                          style={{ borderRadius: "100px", marginRight: "10px" }}
                          title="Breakfast"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color:"black",marginLeft: "30px" ,fontSize:"14px"}}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"Breakfast"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>

              <NavLink
                to="/burger"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ListItemIcon>
                        <img
                          src={burgers}
                          alt="frr"
                          width={120}
                          height={80}
                          style={{ borderRadius: "100px", marginRight: "10px" }}
                          title="Burgers"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "black", marginLeft: "30px" ,fontSize:"14px",fontWeight:"500"}}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"Burgers"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>
              <NavLink
                to="/sandwich"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ListItemIcon>
                        <img
                          src={fish}
                          alt="fish"
                          width={120}
                          height={80}
                          style={{ borderRadius: "100px", marginRight: "10px" }}
                          title="Breakfast"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "black", marginLeft: "30px",fontSize:"14px",fontWeight:"500" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated
                              title={"Chicken & Fish Sandwiches"}
                            />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>

              <NavLink
                to="/mcNuggets"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ListItemIcon>
                        <img
                          src={meals}
                          alt="meals"
                          width={150}
                          height={100}
                          style={{ borderRadius: "100px", marginRight: "10px" }}
                          title="Breakfast"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "black", marginLeft: "30px",fontSize:"14px",fontWeight:"500" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"McNuggets® and Meals"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>

              <NavLink
                to="/fries"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ListItemIcon>
                        <img
                          src={frr}
                          alt="frr"
                          width={150}
                          height={100}
                          style={{ borderRadius: "100px", marginRight: "10px" }}
                          title="Breakfast"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "black", marginLeft: "30px" ,fontSize:"14px",fontWeight:"500"}}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"Fries & Sides"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>
              <NavLink
                to="/happy"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "menuActive" : "menuInactive"
                }
              >
                <ListItemButton>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ListItemIcon>
                        <img
                          src={happy}
                          alt="happy"
                          width={150}
                          height={100}
                          style={{ borderRadius: "100px", marginRight: "10px"}}
                          title="Breakfast"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "black", marginLeft: "30px" ,fontSize:"14px",fontWeight:"500" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"Happy Meal®"} />
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </NavLink>
            </>
          </List>
        </Scrollbars>
      </Drawer>

      <Main
        open={open}
        style={{
          padding: "10px 40px 40px 40px",
          minHeight: "100vh",
          backgroundColor: yellow,
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
   
   </>
  );
}
