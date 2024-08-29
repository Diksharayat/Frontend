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
import { Scrollbars } from "react-custom-scrollbars-2";
import { Avatar, Badge, Button, Grid, LinearProgress, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { SideBarMemoizated } from "./Components/MemoizatedSidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { yellow } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import Profile from '../../Pages/User/profile'; 


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
  const userEmail = localStorage.getItem("email"); 
  const [showProfile, setShowProfile] = useState(false);
  const [menuItems, setMenuItems] = useState([]);


  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




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
 
  const userEmail = localStorage.getItem("email");
  if (!userEmail) {
  
    localStorage.removeItem("cartItems");
    setCartItemsCount(0); 
  }
}, [userEmail]); //



useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/category`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data[0].categories); // Assuming data structure is an array with categories
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  fetchMenuItems();
}, []);






  

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  
  const getUnameAndContact = () => {
    const uname = localStorage.getItem("uname");
    const contact = localStorage.getItem("contact");
    return { uname, contact };
  };

  
   const { uname, contact } = getUnameAndContact();


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
      navigate("/profile");
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
                  Hello {uname}<br/>
                  {contact}
                  </MenuItem>

      {showProfile && (
        <Profile uname={uname} contact={contact} />
      )}

     
      <Divider />
      <MenuItem onClick={() => handleMenuItemClick("Orders")}>Orders</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("ContactUs")}>ContactUs</MenuItem>
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
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#5b0707",
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
          <Divider sx={{ borderColor: 'white' }} />
          <List component="nav" aria-labelledby="nested-list-subheader" style={{backgroundColor:"#5b0707"}}>
          {menuItems?.map((item) => (
  <NavLink
    key={item._id}
    to={`/${item.title.toLowerCase()}/${item?.categoryId}`}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <ListItemButton>
      <ListItemIcon>
        <img
          src={item.image}

          alt={item.title}
          style={{ width: 100, height: 80, borderRadius: "50%" }}
        />
      </ListItemIcon>
      
      <ListItemText primary={item.title} />
    </ListItemButton>
  </NavLink>
))}

          </List>
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
