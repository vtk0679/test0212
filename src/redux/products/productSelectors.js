// const getId = (state) => state.product.id;

const getQuantity = (state) => {
  return state.productsInCart.reduce((acc, item) => acc + item.quantity, 0);
};

const getProducts = (state) => {
  return state.productsInCart;
};

const productSelectors = { getProducts, getQuantity };
export default productSelectors;
