import { PureComponent } from "react";
import { connect } from "react-redux";

import { productSelectors } from "redux/products";
import { setCurrency, currencySelectors } from "redux/currency";
import { apiGetCurrencies, getCurrencySymbol } from "services";

import s from "./NavNavigation.module.css";
import { MiniCart } from "components/MiniCart";

class NavNavigation extends PureComponent {
  state = {
    currencies: [],
    isCurrencySelectorOpened: false,
    isMiniCartOpened: false,
  };

  componentDidMount() {
    apiGetCurrencies().then((items) => this.setState({ currencies: items }));
  }

  onSetCurrencyClick(currency) {
    this.props.setCurrency(currency);
    this.setState({ isCurrencySelectorOpened: false });
  }

  onToggleCurrencySelector = () => {
    this.setState((prevState) => ({
      isCurrencySelectorOpened: !prevState.isCurrencySelectorOpened,
    }));
  };

  onToggleMiniCart = () => {
    this.setState((prevState) => ({
      isMiniCartOpened: !prevState.isMiniCartOpened,
    }));
  };

  render() {
    const quantity = this.props.numberItemsInCart;
    const currencies = this.state.currencies;
    const currentCurrencySymbol = getCurrencySymbol(this.props.currency);

    return (
      <div className={s.container}>
        <button
          key={1}
          className={s.buttonCurrency}
          onClick={this.onToggleCurrencySelector}
        >
          <span className={s.text}>{currentCurrencySymbol}</span>
          {this.state.isCurrencySelectorOpened && (
            <span className={s.spanVectorUp}></span>
          )}
          {!this.state.isCurrencySelectorOpened && (
            <span className={s.spanVectorDown}></span>
          )}
        </button>
        <button
          key={2}
          className={s.buttonCart}
          onClick={this.onToggleMiniCart}
        >
          <span className={s.spanCart}></span>
          <span className={s.spanCartQuantity}></span>
        </button>
        <div className={s.containerQuantity}>
          <span className={s.spanCartQuantity}>{quantity}</span>
        </div>
        {this.state.isMiniCartOpened && <MiniCart></MiniCart>}
        <div className={s.currencyListContainer}>
          <ul
            className={`${s.list}  ${
              this.state.isCurrencySelectorOpened ? s.opened : s.closed
            }`}
          >
            {currencies.map((currency) => (
              <li className={s.item} key={currency}>
                <button
                  className={s.button}
                  onClick={() => this.onSetCurrencyClick(currency)}
                >
                  {getCurrencySymbol(currency) + " " + currency}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberItemsInCart: productSelectors.getQuantity(state),
  currency: currencySelectors.getCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (currency) => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavNavigation);
