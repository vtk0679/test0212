import { PureComponent } from "react";
import { withRouter } from "react-router";

import Attribute from "components/ProductDetails/Attribute";

import s from "./ProductDetails.module.css";
import { apiGetProductById } from "services/api";
import { connect } from "react-redux";
import { currencySelectors } from "redux/currency";
import { getCurrencySymbol } from "services";

class ProductDetails extends PureComponent {
  state = { product: null, attrs: [] };

  componentDidMount() {
    apiGetProductById(this.props.match.params.productId).then((product) => {
      const attrs = product.attributes.map(({ name, type, items }) => ({
        name,
        type,
        items: [items[0]],
      }));
      this.setState({ product, attrs });
    });
  }

  render() {
    const product = this.state.product;
    const currentCurrency = this.props.currency;
    const { gallery, brand, attributes, prices, name } = product || {};

    const currentPrice = (product, currentCurrency) => {
      const priceObj = product.prices.find(
        (price) => price.currency === currentCurrency
      );
      return priceObj.amount;
    };

    return (
      <>
        {product && (
          <div className={s.container}>
            {console.log("product: ", product)}
            <div>
              <ul className={s.list}>
                {gallery.map((imgProduct, i) => (
                  <li key={`productImg${i}`}>
                    <div className={s.containerImg}>
                      <img alt="img" src={imgProduct} className={s.smallImg} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.containerBigImg}>
              <img alt="img" src={gallery[0]} className={s.bigImg} />
            </div>
            <div>
              <h2 className={s.titleProduct}>{name}</h2>
              <p className={s.brand}>{brand}</p>
              <ul className={s.list}>
                {attributes.map((attribute) => (
                  <li key={attribute.name}>
                    <Attribute
                      attribute={attribute}
                      selectedAttrs={this.state.attrs}
                    />
                  </li>
                ))}
              </ul>
              <h2 className={s.title}>Price:</h2>
              <span className={s.currency}>
                {getCurrencySymbol(currentCurrency)}
              </span>
              <span className={s.amount}>
                {currentPrice(product, currentCurrency)}
              </span>
              <button type="button" className={s.button}>
                add to cart
              </button>
              <div></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: currencySelectors.getCurrency(state),
});
// numberItemsInCart: productSelectors.getQuantity(state),

const mapDispatchToProps = (dispatch) => ({});
// setCurrency: (currency) => dispatch(setCurrency(currency)),

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
