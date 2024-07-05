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
import fish from "../../assets/Images/fish.png";
import meals from "../../assets/Images/meals.png";
import burgers from "../../assets/Images/burgers.png";
import frr from "../../assets/Images/frr.png";
import happy from "../../assets/Images/happy.png";
import breakfast from "../../assets/Images/breakfast.png";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Avatar, Badge, Button, Grid, LinearProgress, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { SideBarMemoizated } from "./Components/MemoizatedSidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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


export default function PersistentDrawerLeft(props) {
  const [open, setOpen] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email"); // Assuming userEmail is stored in localStorage



  useEffect(() => {
    const fetchCartItemsCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const count = storedCartItems.reduce((total, item) => total + item.quantity, 0);
      setCartItemsCount(count);
    };

    fetchCartItemsCount();

    const interval = setInterval(fetchCartItemsCount, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


useEffect(() => {
  // Check if userEmail is present in localStorage
  const userEmail = localStorage.getItem("email");
  if (!userEmail) {
    // If userEmail is not present, clear cart items
    localStorage.removeItem("cartItems");
    setCartItemsCount(0); // Reset cart items count in state
  }
}, [userEmail]); //



  const handleDrawerOpen = () => {
    setOpen(!open);
  };


  const handleButtonClick = () => {
    setIsModalOpen(true);
  };





  const CustomBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#FFD700',
      color: 'black',
    },
  }));

  const addToCartBtnStyle = {
 
    fontWeight: "bold",
    color: "rgb(255, 249, 196)",
    padding: "10px 10px",
    marginLeft: "190px",
  };


  const [anchorEl, setAnchorEl] = useState(null);

  
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === "Logout") {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("email"); // Remove email if stored

      // Redirect to login page or homepage
    navigate("/breakfast"); // Example redirect to login page
    } else if (action === "Profile") {
      // Handle profile click
      // Example: history.push("/profile");
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
            onClick={handleDrawerOpen}
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
            {token ? (
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
        Hello Diksha<br/>
        7087241763
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleMenuItemClick("Orders")}>Orders</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Logout")}>Logout</MenuItem>
                </Menu>
                </Grid>
              </>
            ) : (
              <>
             <Grid container spacing={2} alignItems="center">
  <Grid item>
    <Button color="inherit" style={{ ...addToCartBtnStyle, marginLeft: '280px' }} onClick={() => { navigate("/userlog") }}>
      Login
    </Button>
  </Grid>
  <Grid item>
    <Button color="inherit" style={{ fontWeight: "bold", color: "rgb(255, 249, 196)", padding: "10px 10px", marginLeft: '0px' }} onClick={() => { navigate("/userreg") }}>
      Register
    </Button>
  </Grid>
</Grid>

              </>
            )}
          </Grid>
          <Grid>
            <IconButton onClick={navigateToCart}>
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCartIcon sx={{ color: "rgb(255, 249, 196)" }} />
              </Badge>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          m: 0,
          width: drawerWidth,
          // backgroundColor:"#DDBB99",
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
          <Divider />
          <List component="nav" aria-labelledby="nested-list-subheader" style={{backgroundColor:"#5b0707"}}>
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
                            sx={{ color:"rgb(255, 249, 196)", marginLeft: "30px", fontSize: "12px" ,fontWeight:"bold" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"BREAKFAST"} />
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
                            sx={{ color: "rgb(255, 249, 196)", marginLeft: "30px", fontSize: "12px", fontWeight: "bold" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"BURGERS"} />
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
                            sx={{ color: "rgb(255, 249, 196)", marginLeft: "30px", fontSize: "12px", fontWeight: "bold" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated
                              title={"CHICKEN & FISH SANDWICHES"}
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
                            sx={{ color: "rgb(255, 249, 196)", marginLeft: "30px", fontSize: "12px", fontWeight: "bold" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"McNUGGETS® & MEALS"} />
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
                            sx={{ color: "rgb(255, 249, 196)", marginLeft: "30px", fontSize: "12px", fontWeight: "bold" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"FRIES & SIDES"} />
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
                          style={{ borderRadius: "100px", marginRight: "10px" }}
                          title="Breakfast"
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ color: "rgb(255, 249, 196)", marginLeft: "30px", fontSize: "12px", fontWeight: "bold" }}
                            variant="subtitle1"
                            fontWeight="semiBold"
                          >
                            <SideBarMemoizated title={"HAPPY MEAL®"} />
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
          backgroundColor: yellow[100], // Use yellow[100] from MUI theme for background color
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
