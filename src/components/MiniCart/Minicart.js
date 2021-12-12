import { PureComponent } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";

import {
  productSelectors,
  increaseQuantity,
  decreaseQuantity,
} from "redux/products";
import { currencySelectors } from "redux/currency";
import { getCurrencySymbol } from "services";
import Attribute from "components/ProductDetails/Attribute";

import s from "./MiniCart.module.css";

const modalRoot = document.querySelector("#modal-root");

class MiniCart extends PureComponent {
  render() {
    const quantity = this.props.numberItemsInCart;
    const products = this.props.products;
    const currentCurrency = this.props.currency;
    const increaseQuantity = this.props.increaseQuantity;
    const decreaseQuantity = this.props.decreaseQuantity;

    const currentPrice = (product, currentCurrency) => {
      const priceObj = product.prices.find(
        (price) => price.currency === currentCurrency
      );
      return priceObj.amount;
    };

    const countTotalAmount = (products) => {
      return products.reduce((acc, item) => {
        const price = currentPrice(item.product, currentCurrency);
        const res = acc + price;
        return res;
      }, 0);
    };

    return createPortal(
      <>
        <div className={s.overlay}>
          <div className={s.container}>
            <div className={s.cart}>
              <h2 className={s.title}>
                My bag, <span>{quantity}</span> items
              </h2>
              <ul className={s.list}>
                {products.length > 0 &&
                  products.map((item) => {
                    const { product } = item;
                    return (
                      <li className={s.item} key={product.id}>
                        <div className={s.leftContainer}>
                          <h2 className={s.titleName}>{product.name}</h2>
                          <p className={s.brand}>{product.brand}</p>
                          <span>{getCurrencySymbol(currentCurrency)}</span>
                          <span>{currentPrice(product, currentCurrency)}</span>
                          <ul className={s.list}>
                            {item.attrs.map((attribute) => (
                              <li key={attribute.name}>
                                {console.log("1 attr:", attribute)}
                                <Attribute attribute={attribute} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={s.centreContainer}>
                          <button
                            type="button"
                            className={s.button}
                            onClick={() => increaseQuantity(product.id)}
                          >
                            +
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            className={s.button}
                            onClick={() => decreaseQuantity(product.id)}
                          >
                            -
                          </button>
                        </div>
                        <div className={s.rightContainer}>
                          <img
                            alt="img"
                            src={product.gallery[0]}
                            className={s.img}
                          />
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <div className={s.prices}>
                <p>Total:</p>
                <p>
                  {products.length > 0
                    ? countTotalAmount(products) +
                      getCurrencySymbol(currentCurrency)
                    : 0}
                </p>
              </div>
              <button type="button" className={s.buttonBag}>
                view bag
              </button>
              <button type="button" className={s.buttonCart}>
                check out
              </button>
            </div>
          </div>
        </div>
      </>,
      modalRoot
    );
  }
}

const mapStateToProps = (state) => ({
  products: productSelectors.getProducts(state),
  numberItemsInCart: productSelectors.getQuantity(state),
  currency: currencySelectors.getCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  increaseQuantity: (productId) => {
    console.log("increasing ID:", productId);
    return dispatch(increaseQuantity(productId));
  },
  decreaseQuantity: (productId) => dispatch(decreaseQuantity(productId)),
});
// setCurrency: (currency) => dispatch(setCurrency(currency)),

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
