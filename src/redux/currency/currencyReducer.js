import { createReducer } from "@reduxjs/toolkit";
import { setCurrency } from "./currencyActions";

export const currencyReducer = createReducer("USD", {
  [setCurrency]: (state, action) => {
    return action.payload;
  },
});
