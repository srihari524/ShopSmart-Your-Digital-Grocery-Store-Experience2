import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSlideReducer from "./productSlide";
import orderSliceReducer from "./orderSlice"; // Import the orderSlice

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSlideReducer,
    order: orderSliceReducer, // Add the orderSlice reducer here
    payment: {
      url: `/checkout`,
    },
  },
});
