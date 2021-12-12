import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction("products/addToCart");
export const quickAddToCart = createAction("products/quickAddToCart");
export const increaseQuantity = createAction("products/increaseQuantity");
export const decreaseQuantity = createAction("products/decreaseQuantity");
