import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingState = boolean;

const loadingSlice = createSlice({
  name: "loading",
  initialState: true as LoadingState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
