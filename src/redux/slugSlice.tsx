"use client"
import { createSlice } from "@reduxjs/toolkit";

const slugSlice = createSlice({
  name: "slug",
  initialState: {
    currentSlug: "",
  },
  reducers: {
    setSlug: (state, action) => {
      state.currentSlug = action.payload;
    },
  },
});

export const { setSlug } = slugSlice.actions;

export default slugSlice.reducer;
