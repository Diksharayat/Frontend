import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from 'react';
import PersistentDrawerLeft from "./Components/SideBar/index2";
import Burger from "./Pages/Burgers";
import Sandwiches from "./Pages/Sandwiches";
import McNuggets from "./Pages/mcNuggets";
import Happy from "./Pages/Happy";
import AddToCart from "./Pages/AddToCart/AddToCart";
import Fries from "./Pages/Fries";
import CartMapping from "./Pages/Breakfast";
import SliderTemplate from "./Pages/Home";
import "./App.css";
import Checkout from "./Pages/Checkout";
import Thankyou from "./Pages/Thankyou/Thankyou";
import UserLog from "./Pages/User/UserLog";
import UserReg from "./Pages/User/UserReg";




const SideBar = lazy(() => import("./Components/SideBar/index2"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route> 
        <Route path="/" element={<>
        
            <Suspense fallback={<div>Loading...</div>}>
              <SideBar>
                <SliderTemplate />
             
              </SideBar>
              </Suspense>
            </>} />

        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<Thankyou/>} />
        <Route path="/userlog" element={<UserLog/>} />
        <Route path="/userreg" element={<UserReg/>} />
        
       
    
      
        <Route
          path="/breakfast"
          element={
            <>
            <Suspense fallback={<div>Loading...</div>}>
              <SideBar>
                <CartMapping />
             
              </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/burger"
          element={
            <>
             <Suspense fallback={<div>Loading...</div>}>
              <SideBar>
                <Burger />
              
              </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/sandwich"
          element={
            <>
               <Suspense fallback={<div>Loading...</div>}>
               <SideBar>
                <Sandwiches />
             
                </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/mcNuggets"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
              <SideBar>
                <McNuggets />
                
                </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/fries"
          element={
            <>
            <Suspense fallback={<div>Loading...</div>}>
            <SideBar>
                <Fries />
             
                </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/happy"
          element={
            <><Suspense fallback={<div>Loading...</div>}>
            
            <PersistentDrawerLeft>
                <Happy />
                </PersistentDrawerLeft>
              </Suspense>
            </>
          }
        ></Route>
      </Route>
  
    </>
  )
);

export default router;
