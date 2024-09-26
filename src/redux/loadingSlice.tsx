import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingState = boolean;

const loadingSlice = createSlice({
  name: "loading",
  initialState: false as LoadingState, 
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      return action.payload; 
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
