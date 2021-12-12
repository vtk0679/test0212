import { createReducer } from "@reduxjs/toolkit";
import { check } from "prettier";
import {
  addToCart,
  quickAddToCart,
  increaseQuantity,
  decreaseQuantity,
} from "./productsActions";

const makeProduct = ({ product, quantity, attrs }) => {
  return {
    product,
    quantity,
    attrs,
  };
};

const quickMakeProduct = ({ product }) => {
  const attrs = product.attributes.map(({ name, type, items }) => ({
    name,
    type,
    items: [items[0]],
  }));
  return {
    product,
    quantity: 1,
    attrs, //: [{ name: "", type: "text", item: { value: "", displayValue: "" } }],
  };
};

const checkIsInTheCart = (state, payload) => {
  console.log("payload: ", payload);
  const product = state.find((item) => item.product.id === payload.product.id);
  if (product) {
    state[state.indexOf(product)].quantity += 1;
    return state;
  } else return [...state, quickMakeProduct(payload)];
};

const increaseQuantityFn = (state, payload) => {
  const product = state.find((item) => item.product.id === payload);
  product.quantity += 1; // still immutable, using immer
  return state;
};

const decreaseQuantityFn = (state, payload) => {
  const product = state.find((item) => item.product.id === payload);
  if (product.quantity > 0) product.quantity -= 1; // still immutable, using immer
  return state;
};

const products = createReducer([], {
  //   [addToCart]: (state, action) => checkIsInTheCart(state, action.payload)
  [quickAddToCart]: (state, action) => checkIsInTheCart(state, action.payload),
  [increaseQuantity]: (state, action) =>
    increaseQuantityFn(state, action.payload),
  [decreaseQuantity]: (state, action) =>
    decreaseQuantityFn(state, action.payload),
});

// const quantity = createReducer(1, {
//   [increaseQuantity]: (state, action) => state + 1,
//   [decreaseQuantity]: (state, action) => state - 1,
// });

// const attr = createReducer([], {
//   [addToCart]: (_, action) => action.payload,
//   [quickAddToCart]: (_, __) => [
//     { name: "", type: "text", item: { value: "", displayValue: "" } },
//   ],
// });

//  combineReducers({
//   product,
//   quantity,
//   attr,
// });
export default products;
