import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleGallery: "MY PHOTO",
};

const toggleGallerySlice = createSlice({
  name: "toggleGallery",
  initialState,
  reducers: {
    setToggleGallery: (state, action) => {
      state.toggleGallery = action.payload;
    },
  },
});

export const { setToggleGallery } = toggleGallerySlice.actions;

export default toggleGallerySlice.reducer;
