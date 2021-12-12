import { PureComponent } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { quickAddToCart } from "redux/products";

import s from "./Product.module.css";
import IconButton from "./IconButton";
import { ReactComponent as CartIcon } from "components/Product/icons/cart.svg";

class Product extends PureComponent {
  onClickCartBtn = (e) => {
    e.preventDefault();
    this.props.quickAddToCart({ product: this.props.product });
  };

  render() {
    const product = this.props.product;
    const a = "&#36";
    const b = "<h2>inner</h2>";
    return (
      <div className={s.box}>
        <div className={s.imgThumb}>
          <img className={s.img} alt="111" src={product.gallery[0]} />
        </div>
        <h2 className={s.title}>{product.name}</h2>
        <span className={s.textMain}>{`${product.prices[0].currency} `}</span>
        <span className={s.text}>{product.prices[0].amount}</span>
        <IconButton
          onClick={this.onClickCartBtn}
          className={s.button}
          aria-label="Add to cart"
        >
          <CartIcon width="24" height="24" fill="#fff" />
        </IconButton>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  quickAddToCart: (product) => dispatch(quickAddToCart(product)),
});
// ({
//   fetchCategories: () => dispatch(fetchCategories()),
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
