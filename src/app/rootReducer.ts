import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import pageReducer from "../features/page/pageSlice";
import productReducer from "../features/product/productSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  page: pageReducer,
  product: productReducer,
  theme: themeReducer,
});

export default rootReducer;
