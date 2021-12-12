import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "redux/categories";
import { productsReducer } from "redux/products";
import { currencyReducer } from "./currency";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    productsInCart: productsReducer,
    currency: currencyReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
