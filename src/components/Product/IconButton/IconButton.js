import React from "react";
import PropTypes from "prop-types";
import s from "./IconButton.module.css";

const IconButton = ({ children, onClick, className, ...allyProps }) => (
  <button
    type="button"
    className={s.button + " " + className}
    onClick={onClick}
    {...allyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  "aria-label": PropTypes.string.isRequired,
};

export default IconButton;
