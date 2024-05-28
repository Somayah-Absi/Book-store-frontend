import React from "react";
import { FaCartPlus } from "react-icons/fa";

const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon-wrapper">
      <FaCartPlus className="cart-icon" />
      <span>{value}</span>
    </div>
  );
};

export default CartIcon;
