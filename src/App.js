import { PureComponent, Suspense } from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import React from "react";

import ProductList from "components/ProductList";
import ProductDetails from "components/ProductDetails";
import AppBar from "components/AppBar";
import { getCategories, fetchCategories } from "redux/categories";

import { apiGetProductById } from "services/api";

import { MiniCart } from "./components/MiniCart";

import s from "../src/App.module.css";

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
  }

  getRouts(categories) {
    const arr = [];
    categories.forEach((el) => {
      arr.push(
        <Route key={el.name} path={`/${el.name}`} exact>
          <ProductList name={el.name} />
        </Route>
      );
      arr.push(
        <Route key={`${el.name}/id`} path={`/${el.name}/:productId/`} exact>
          <ProductDetails />
        </Route>
      );
    });

    return arr;
  }

  render() {
    const categories = this.props.categories;
    return (
      <>
        {categories.length > 0 && (
          <div className={s.container}>
            <AppBar />
            <Switch>{this.getRouts(categories)}</Switch>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({ categories: getCategories(state) });

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
