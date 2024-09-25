"use client";
import { configureStore } from "@reduxjs/toolkit";
import slugReducer from "./slugSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    slug: slugReducer,
    cart: cartReducer,
  },
});
