import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pageReducer from "../features/page/pageSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  theme: themeReducer,
});

export default rootReducer;
