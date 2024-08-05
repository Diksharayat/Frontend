import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import PersistentDrawerLeft from "./Components/SideBar/index2";
import Burger from "./Pages/Burgers";
import Sandwiches from "./Pages/Sandwiches";
import McNuggets from "./Pages/mcNuggets";
import Happy from "./Pages/Happy";
import Fries from "./Pages/Fries";
import CartMapping from "./Pages/Breakfast";
import SliderTemplate from "./Pages/Home";
import "./App.css";
import Checkout from "./Pages/Checkout";
import Thankyou from "./Pages/Thankyou/Thankyou";
import UserLog from "./Pages/User/UserLog";
import UserReg from "./Pages/User/UserReg";
import UserProfileForm from "./Pages/User/profile";
import ContactForm from "./Pages/ContactUs";
import Orders from "./Pages/User/Orders";
import AddToCart from "./Pages/AddToCart";
import ALogin from "./admin/AdminLog";
import AdminProfile from "./admin/AdminProfile";
import AddCategory from "./admin/AddCategory/AddCategory";
import AddDishes from "./admin/AddDishes";
import AllOrders from "./admin/AllOrders";
import AdminOrdersTable from "./admin/AllOrders";

const SideBar = lazy(() => import("./Components/SideBar/index2"));
const AdminSidebar = lazy(() => import("./admin/Components/SideBar/index2"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route
          path="/"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar>
                  <SliderTemplate />
                </SideBar>
              </Suspense>
            </>
          }
        />

        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/userlog" element={<UserLog />} />
        <Route path="/userreg" element={<UserReg />} />
        {/* <Route path="/userprofile" element={<UserProfile/>} /> */}

        <Route
          path={`/breakfast/:id`}
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
          path="/burgers/:id"
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
          path="/sandwiches/:id"
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
          path="/mcNuggets® & meals/:id"
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
          path="/fries & sides/:id"
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
          path="/happy meal®/:id"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <PersistentDrawerLeft>
                  <Happy />
                </PersistentDrawerLeft>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar>
                  <UserProfileForm />
                </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar>
                  <ContactForm />
                </SideBar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar>
                  <Orders />
                </SideBar>
              </Suspense>
            </>
          }
        ></Route>

        {/* admin routes */}

        <Route path="/adminlog" element={<ALogin />} />

        <Route
          path="/adminportal"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <AdminSidebar />
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/adminprofile"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <AdminSidebar>
                  <AdminProfile />
                </AdminSidebar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/manage-category"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <AdminSidebar>
                  <AddCategory />
                </AdminSidebar>
              </Suspense>
            </>
          }
        ></Route>
        <Route
          path="/manage-dishes"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <AdminSidebar>
                  <AddDishes />
                </AdminSidebar>
              </Suspense>
            </>
          }
        ></Route>

        <Route
          path="/allOrders"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <AdminSidebar>
                  <AdminOrdersTable />
                </AdminSidebar>
              </Suspense>
            </>
          }
        ></Route>
      </Route>
    </>
  )
);

export default router;
