import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { dashboardApi } from "./services/dashboardServices";



export const store= configureStore({
  reducer:{
  
  [dashboardApi.reducerPath]: dashboardApi.reducer,

},
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat( dashboardApi.middleware),
  
});



setupListeners(store.dispatch);