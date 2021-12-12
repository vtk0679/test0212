import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import * as api from "../../services/api";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { getCategories } from "redux/categories";

class Navigation extends PureComponent {
  render() {
    return (
      <nav className={s.container}>
        <ul className={s.list}>
          {this.props.categories.map((category) => (
            <li key={category.name}>
              <NavLink
                to={`/${category.name}`}
                className={s.navigation}
                activeClassName={s.navigationActive}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({ categories: getCategories(state) });

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
