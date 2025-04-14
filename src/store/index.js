import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import produtcsSlice from "./productsSlice";
import userSlice from "./userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      category: categorySlice,
      products: produtcsSlice,
      user: userSlice,
    },
  });
