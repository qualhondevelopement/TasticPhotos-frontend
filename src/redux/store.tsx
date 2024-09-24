"use client";
import { configureStore } from "@reduxjs/toolkit";
import slugReducer from "./slugSlice"; // Create this file next

export const store = configureStore({
  reducer: {
    slug: slugReducer,
  },
});
