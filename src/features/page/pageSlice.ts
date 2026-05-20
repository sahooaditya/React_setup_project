import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    title: "Home",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = pageSlice.actions;
export default pageSlice.reducer;
