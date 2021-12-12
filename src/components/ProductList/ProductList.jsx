import { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Product from "components/Product";
import { apiGetProductsByCategory } from "services/api";

import s from "./ProductList.module.css";

class ProductList extends PureComponent {
  state = { products: [] };

  componentDidMount() {
    apiGetProductsByCategory(this.props.name).then((res) =>
      this.setState({ products: res })
    );
  }

  render() {
    const name = this.props.name;
    const products = this.state.products;
    return (
      <>
        <h1 className={s.title}>{name[0].toUpperCase() + name.slice(1)}</h1>

        <ul className={s.list}>
          {products.map((product) => (
            <li className={s.item} key={product.id}>
              <Link
                to={`${this.props.match.url}/${product.id}`}
                className={s.link}
              >
                <Product product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
// ({
//   fetchCategories: () => dispatch(fetchCategories()),
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductList));
